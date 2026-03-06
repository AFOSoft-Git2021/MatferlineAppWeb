import { Component, effect, inject, input, OnInit, signal, untracked } from '@angular/core';
import { Router } from '@angular/router';
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
import { TestPregunta } from '../../../data/model/testPregunta';
import { environment } from '../../../../environments/environment';
import { TestItemRespuesta } from "../test-item-respuesta/test-item-respuesta";
import { TestChrono } from "../test-chrono/test-chrono";
import { TestInfoResult } from "../test-info-result/test-info-result";

@Component({
  selector: 'app-test-container',
  imports: [TopAppBarLogged, TestBottomMenu, TestMenuHeader, TestItemRespuesta, TestChrono, TestInfoResult],
  templateUrl: './test-container.html',
  styleUrl: './test-container.scss',
})
export class TestContainer implements OnInit {

  private stateService = inject(StateService);
  private getTestPredefinidoService = inject(GetTestPredefinidoService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  public TipoTest = TipoTest;

  tipo = input.required<TipoTest>();

  testLoaded = signal(false);
  chronoIsRunning = signal(false);
  numeroPregunta = signal(0);
  modoCorreccion = signal(false);

  alumno: (Alumno | null) = null;
  test: any;
  dataTest: any;
  BASE_STORAGE_PREGUNTAS = environment.BASE_STORAGE_PREGUNTAS
  listCorregidasAutocorreccion: boolean[] = [];


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
    console.log(this.tipo());

    this.alumno = this.stateService.alumnoLogeado();

    if (this.tipo() === TipoTest.TestPredefinido) {
      this.dataTest = this.stateService.testPredefinidoSelected() as DataTestPredefinido;
      if (this.dataTest) {
        this.getTestPredefinido(this.dataTest);
      } else {
        this.router.navigate(['/dashboard/predefinidos']);
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
              this.testLoaded.set(true);

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
  /* GESTION DE LAS RESPUESTAS */
  /*****************************/
  setAnswerSelected(respuesta: number) {
    this.test.preguntas[this.numeroPregunta()].seleccion = respuesta;
  }



  /***************************/
  /* GESTION DEL BOTTOM MENU */
  /***************************/
  clickOptionBottomMenu(option: number) {
    switch (option) {
      case 1:
        // TODO: mostrar ayuda
        break;
      case 2:
        // mostrar menu preguntas
        break;
      case 3:
        if (this.numeroPregunta() > 0) { this.numeroPregunta.set(this.numeroPregunta() - 1) }
        break;
      case 4:
        if (this.numeroPregunta() < this.test.preguntas.length - 1) { this.numeroPregunta.set(this.numeroPregunta() + 1) }
        break;
      case 5:
        // TODO: corregir
        break;
    }
  }


  /*************************/
  /*   GESTION DE POPUPS   */
  /*************************/

  // 1. Alert avandonar el test
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

}
