import { Component, effect, inject, input, linkedSignal, OnDestroy, OnInit, signal, untracked } from '@angular/core';
import { Data, Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { GetTestPredefinidoService } from '../../../data/repository/get-test-predefinido.service';
import { DataTestPredefinido } from '../../../data/model/dataTestPredefinidos';
import { TipoTest } from '../../../data/model/tipoTestEnum';
import { TopAppBarLogged } from "../../shared/top-app-bar-logged/top-app-bar-logged";
import { Alumno } from '../../../data/model/alumno';
import { TestPredefinido } from '../../../data/model/testPredefinido';
import { TestBottomMenu } from "../test-bottom-menu/test-bottom-menu";
import { TestMenuHeader } from "../test-menu-header/test-menu-header";
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from '../../shared/popup-confirm/popup-confirm.component';
import { environment } from '../../../../environments/environment';
import { TestItemRespuesta } from "../test-item-respuesta/test-item-respuesta";
import { TestChrono } from "../test-chrono/test-chrono";
import { TestInfoResult } from "../test-info-result/test-info-result";
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TestBottomsheetBuscar } from '../test-bottomsheet-buscar/test-bottomsheet-buscar';
import { TestPregunta } from '../../../data/model/testPregunta';
import { GetTestAleatorioService } from '../../../data/repository/get-test-aleatorio.service';
import { DataTestAleatorio } from '../../../data/model/dataTestAleatorio';
import { TestAleatorio } from '../../../data/model/testAleatorio';
import { TestBottomsheetAyuda } from '../test-bottomsheet-ayuda/test-bottomsheet-ayuda';
import { TestInfoModoTest } from "../test-info-modo-test/test-info-modo-test";
import { TestBloqueoChrono } from "../test-bloqueo-chrono/test-bloqueo-chrono";
import { TestPhotoZoom } from "../test-photo-zoom/test-photo-zoom";
import { TestTimeOut } from "../test-time-out/test-time-out";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestResultado } from "../test-resultado/test-resultado";
import { DataResponseCorregirTest } from '../../../data/model/dataResponseCorregirTest';

@Component({
  selector: 'app-test-container',
  imports: [
    TopAppBarLogged,
    TestBottomMenu,
    MatBottomSheetModule,
    TestMenuHeader,
    TestItemRespuesta,
    TestChrono,
    TestInfoResult,
    TestInfoModoTest,
    TestBloqueoChrono,
    TestPhotoZoom,
    TestTimeOut,
    TestResultado
  ],
  templateUrl: './test-container.html',
  styleUrl: './test-container.scss',
})
export class TestContainer implements OnInit, OnDestroy {

  private stateService = inject(StateService);
  private getTestPredefinidoService = inject(GetTestPredefinidoService);
  private getTestAleatorioService = inject(GetTestAleatorioService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private bottomSheet = inject(MatBottomSheet);
  private matSnackbar = inject(MatSnackBar);
  public TipoTest = TipoTest;

  tipo = input.required<TipoTest>();

  testLoaded = signal(false);
  numeroPregunta = signal(0);
  modoCorreccion = signal(false);
  showInfoModoTest = linkedSignal(() => { return this.stateService.showInfoModoTest });
  showPhotoZoom = signal(false);
  showResultadoTest = signal(false);

  alumno: (Alumno | null) = null;
  test: any;
  dataTest: any;
  BASE_STORAGE_PREGUNTAS = environment.BASE_STORAGE_PREGUNTAS
  listCorregidasAutocorreccion: boolean[] = [];

  chrono: any;
  chronoTimeOut = signal(false);
  chronoIsRunning = signal(true);
  chronoTime = signal(0);
  chronoCounter = signal(0);
  chronoDisplayState = signal('--:--');

  dataTestCorregido: DataResponseCorregirTest | null = null;


  constructor() {
    effect(() => {
      if (this.modoCorreccion()) {
        untracked(() => {
          this.dialog.closeAll();
          this.numeroPregunta.set(0);
        })
      }
    })
  }

  ngOnInit() {
    if (!this.stateService.showInfoModoTest) { this.stateService.showInfoModoTest = '1' }
    this.loadTest()
  }

  ngOnDestroy() {
    clearInterval(this.chrono);
  }

  loadTest() {
    console.log(this.tipo());

    this.alumno = this.stateService.alumnoLogeado();

    if (this.tipo() === TipoTest.TestPredefinido) {
      this.dataTest = this.stateService.testPredefinidoSelected() as DataTestPredefinido;
      if (this.dataTest) {
        this.getTestPredefinido(this.dataTest);
      } else {
        this.router.navigate(['/dashboard/predefinidos']);
      }
    } else {
      this.dataTest = this.stateService.testAleatorioSelected() as DataTestAleatorio;
      if (this.dataTest) {
        this.getTestAleatorio(this.dataTest);
      } else {
        this.router.navigate(['/dashboard/aleatorios']);
      }
    }
  }

  // descarga un test predefinido
  getTestPredefinido(dataTestPredefinido: DataTestPredefinido) {
    this.stateService.loadingSpinner.set(true);
    this.getTestPredefinidoService.getTestPredefinido(dataTestPredefinido).subscribe(
      {
        next: (response) => {
          this.stateService.loadingSpinner.set(false);

          if (response.status === 200) {
            console.log(response.body);

            if (response.body.tipo_test) {

              this.test = response.body as TestPredefinido;
              this.stateService.testPredefinidoSelected.set(null);

              if (this.test.autocorreccion === 1) {
                this.listCorregidasAutocorreccion = new Array(this.test.preguntas.length).fill(false);
              }

              this.testLoaded.set(true);

              if (!this.showInfoModoTest()) { this.startTest() }

            } else {
              console.log('response', response.body.message);
              this.router.navigate(['concurrencia', response.body.message]);
            }
          }
        },
        error: (error) => {
          this.stateService.loadingSpinner.set(false);
          console.log('error: ', error.message);
          this.router.navigate(['error']);
        }
      }
    )
  }

  // descarga un test aleatorio
  getTestAleatorio(dataTestAleatorio: DataTestAleatorio) {
    this.stateService.loadingSpinner.set(true);
    this.getTestAleatorioService.getTestAleatorio(dataTestAleatorio).subscribe(
      {
        next: (response) => {
          this.stateService.loadingSpinner.set(false);

          if (response.status === 200) {
            console.log(response.body);

            if (response.body.tipo_test) {

              this.test = response.body as TestAleatorio;
              this.stateService.testAleatorioSelected.set(null);
              this.testLoaded.set(true);

              if (this.test.autocorreccion === 1) {
                this.listCorregidasAutocorreccion = new Array(this.test.preguntas.length).fill(false);
              }

              if (!this.showInfoModoTest()) { this.startTest() }

            } else {
              console.log('response', response.body.message);
              this.router.navigate(['concurrencia', response.body.message]);
            }
          }
        },
        error: (error) => {
          this.stateService.loadingSpinner.set(false);
          console.log('error: ', error.message);
          this.router.navigate(['error']);
        }
      }
    )
  }



  /*****************************/
  /*     GESTION DEL CRONO     */
  /*****************************/
  startTest() {
    this.showInfoModoTest.set('0');
    this.chronoTime.set(this.test.preguntas.length * 60);
    this.chronoCounter.set(this.chronoTime());
    console.log('chronoTime', this.chronoTime());

    this.startChrono();
    this.chronoIsRunning.set(true);
  }

  startChrono() {
    this.chrono = setInterval(() => {
      this.chronoCounter.update(value => value - 1);
      // calcular minutos y segundos
      const minutes = Math.floor(this.chronoCounter() / 60);
      const seconds = this.chronoCounter() % 60;

      // formatear con dos digitos
      const display =
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

      // actualizar estado de display
      this.chronoDisplayState.set(display);

      // timeout => detiene el chrono
      if (this.chronoCounter() === 0) { this.setTimeOut() }
    }, 1000);
  }

  manageChrono() {
    this.chronoIsRunning.update(value => !value);

    if (!this.chronoIsRunning()) {
      clearInterval(this.chrono);
    } else {
      this.startChrono();
    }
  }

  setTimeOut() {
    this.manageChrono();
    this.showPhotoZoom.set(false);
    this.bottomSheet.dismiss();
    this.dialog.closeAll();
    this.chronoTimeOut.set(true);
  }



  /****************************/
  /*     GESTION DEL TEST     */
  /****************************/
  checkTestCompleto(timeOut = false): boolean {
    let checkResult = true;
    if (!timeOut) { // Las preguntas no contestadas por timeout -> pregunta.seleccion = 0, se dejan tal cual
      for (const PREGUNTA of this.test.preguntas) {
        if (PREGUNTA.seleccion === 0) {
          checkResult = false;
          break;
        }
      }
    }
    return checkResult;
  }

  checkTestAutocorreccionCompleto(): boolean {
    let checkResult = true;
    for (const PREGUNTA_CORREGIDA of this.listCorregidasAutocorreccion) {
      if (!PREGUNTA_CORREGIDA) {
        checkResult = false;
        break;
      }
    }
    return checkResult;
  }



  /*****************************/
  /* GESTION DE LAS RESPUESTAS */
  /*****************************/
  setAnswerSelected(respuesta: number) {
    if (this.test.autocorreccion === 1 && this.listCorregidasAutocorreccion[this.numeroPregunta()]) {
      this.showInfoSnackbar(`La pregunta ${this.numeroPregunta() + 1} ya está corregida`);
    } else {
      this.test.preguntas[this.numeroPregunta()].seleccion = respuesta + 1;
    }
  }



  /***************************/
  /* GESTION DEL BOTTOM MENU */
  /***************************/
  clickOptionBottomMenu(option: number) {
    switch (option) {
      case 1:
        this.openBottomSheetAyuda()
        break;
      case 2:
        this.openBottomSheetBuscar()
        break;
      case 3:
        if (this.numeroPregunta() > 0) { this.numeroPregunta.set(this.numeroPregunta() - 1) }
        break;
      case 4:
        if (this.numeroPregunta() < this.test.preguntas.length - 1) { this.numeroPregunta.set(this.numeroPregunta() + 1) }
        break;
      case 5:
        // corregir el test
        if (!this.modoCorreccion()) {

          if (this.test.autocorreccion === 1) {

            if (this.listCorregidasAutocorreccion[this.numeroPregunta()]) {
              this.showInfoSnackbar(`La pregunta ${this.numeroPregunta() + 1} ya está corregida`);
            } else if (this.test.preguntas[this.numeroPregunta()].seleccion === 0) {
              this.showInfoSnackbar('Selecciona una respuesta');
            } else {
              this.listCorregidasAutocorreccion[this.numeroPregunta()] = true;
              if (this.checkTestAutocorreccionCompleto()) {
                this.popUpAutocorreccionCompleta();
              }
            }

          } else {
            if (this.checkTestCompleto()) {
              this.popUpCorregirTest();
            } else {
              this.showInfoSnackbar('Tienes que completar el test antes de enviarlo a corrección');
            }
          }

        } else {
          this.showInfoSnackbar('El test ya está corregido');
        }
        break;
    }
  }



  /****************/
  /* BOTTOM SHEET */
  /****************/
  openBottomSheetAyuda() {
    this.bottomSheet.open(TestBottomsheetAyuda, {
      data: {
        numeroPregunta: this.numeroPregunta() + 1,
        txtAyuda: this.test.preguntas[this.numeroPregunta()].ayuda
      }
    })
  }

  openBottomSheetBuscar() {
    const SHEET = this.bottomSheet.open(TestBottomsheetBuscar, {
      data: {
        modoCorreccion: this.modoCorreccion(),
        autocorreccion: this.test.autocorreccion,
        listCorregidasAutocorreccion: this.listCorregidasAutocorreccion,
        preguntasTest: this.test.preguntas as TestPregunta[]
      }
    })

    SHEET.afterDismissed().subscribe(
      (respuesta) => { if (respuesta) { this.numeroPregunta.set(respuesta.pregunta) } }
    )
  }



  /*************************/
  /*   GESTION DE POPUPS   */
  /*************************/

  // SnackBar
  showInfoSnackbar(mensaje: string) {
    this.matSnackbar.open(mensaje, 'Ok', {
      duration: 4000
    })
  }

  // Alert abandonar el test
  checkNavigateBack() {
    if (!this.modoCorreccion()) {
      this.popUpNavigateBack();
    } else {
      this.navigateBack();
    }
  }

  navigateBack() {
    // TODO: reset del crono y otras variables
    const ROUTE = this.tipo() === TipoTest.TestPredefinido ? '/dashboard/predefinidos' : '/dashboard/aleatorios';
    this.router.navigate([ROUTE]);
  }

  popUpNavigateBack() {
    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo: 'Salir del test',
        mensaje: 'Vas a salir del test. No se guardarán los resultados. ¿Deseas continuar?',
        modo: 1,
        tipo: 1
      }
    });

    // al cerrar popup ...
    dialogRef.afterClosed().subscribe(
      (respuesta) => { if (respuesta.accion) { this.navigateBack() } })
  }


  // Alert test de estudio completado
  popUpAutocorreccionCompleta() {
    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo: 'Test completo',
        mensaje: 'Has completado tu test de estudio. Pulsa el botón para terminar.',
        modo: 0,
        tipo: 0
      }
    });

    // al cerrar popup ...
    dialogRef.afterClosed().subscribe(
      (respuesta) => {
        if (respuesta.accion) {
          // TODO: llamar a correctTestAutocorreccion() el cual llama al endpoint para corregir test predefinido o aleatorio
        }
      })
  }


  // Alert corregir el test
  popUpCorregirTest() {
    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo: 'Corrección del test',
        mensaje: 'Vamos a corregir tu test. ¿Deseas continuar?',
        modo: 0,
        tipo: 1
      }
    });

    // al cerrar popup ...
    dialogRef.afterClosed().subscribe(
      (respuesta) => {
        if (respuesta.accion) {
          // TODO: llamar endpoint para corregir test predefinido o aleatorio
        }
      })
  }

}
