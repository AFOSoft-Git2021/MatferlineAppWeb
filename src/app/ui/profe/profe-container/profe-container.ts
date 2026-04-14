import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { GetTemaProfeService } from '../../../data/repository/get-tema-profe.service';
import { ProfeTema } from '../../../data/model/profeTema';
import { ProfeDataGetTema } from '../../../data/model/profeDataGetTema';
import { TopAppBarLogged } from '../../shared/top-app-bar-logged/top-app-bar-logged';
import { ProfeBottomMenu } from "../profe-bottom-menu/profe-bottom-menu";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupConfirmComponent } from '../../shared/popup-confirm/popup-confirm.component';
import { ProfeMenuHeader } from "../profe-menu-header/profe-menu-header";
import { ProfeElementoActivo } from "../profe-elemento-activo/profe-elemento-activo";
import { ProfeListaEpigrafes } from "../profe-lista-epigrafes/profe-lista-epigrafes";
import { ProfeListaElementos } from "../profe-lista-elementos/profe-lista-elementos";
import { SetReproduccionTemaProfeService } from '../../../data/repository/set-reproduccion-tema-profe.service';
import { DataSetReproduccionTemaProfe } from '../../../data/model/dataSetReproduccionTemaProfe';
import { DataTestPredefinidoTemaProfe } from '../../../data/model/dataTestPredefinidoTemaProfe';
import { TipoTest } from '../../../data/model/tipoTestEnum';
import { Servicio } from '../../../data/model/servicioEnum';
import { ReloginService } from '../../../data/repository/relogin.service';
import { DeviceSystem } from '../../../data/model/deviceSystem';

@Component({
  selector: 'app-profe-container',
  imports: [TopAppBarLogged, ProfeBottomMenu, ProfeMenuHeader, ProfeElementoActivo, ProfeListaEpigrafes, ProfeListaElementos],
  templateUrl: './profe-container.html',
  styleUrl: './profe-container.scss',
})
export class ProfeContainer implements OnInit, OnDestroy {

  private router = inject(Router);
  private stateService = inject(StateService);
  private reloginService = inject(ReloginService);
  private getTemaProfeService = inject(GetTemaProfeService);
  private setReproduccionTemaProfeService = inject(SetReproduccionTemaProfeService);
  private dialog = inject(MatDialog);
  private matSnackbar = inject(MatSnackBar);

  alumno = computed(() => this.stateService.alumnoLogeado());
  profeDataGetTema: any;
  profeTema: ProfeTema | null = null;
  temaLoaded = signal(false);
  temaEstudiado = signal(false);
  indexEA = signal(0);

  audioPlayer: HTMLAudioElement;
  isPlaying = signal(false);
  isMuted = signal(false);

  showListaElementos = signal(false);
  showListaEpigrafes = signal(false);
  listaDeEpigrafes: [number, string][] = [];
  listaDeElementos: [string, string][] = [];
  elementosEstudiadosList: boolean[] = [];

  constructor() {
    this.audioPlayer = new Audio();
    this.setAudioPlayer();

    effect(() => {
      if (this.temaLoaded()) {
        if (!this.temaEstudiado()) {
          this.elementosEstudiadosList[this.indexEA()] = true;
          this.checkUmbralTema();
        }
      }
    })
  }

  ngOnInit() {
    this.profeDataGetTema = this.stateService.profeDataGetTema() as ProfeDataGetTema;
    if (this.profeDataGetTema) {
      this.getTemaProfe();
    } else {
      this.router.navigate(['/dashboard/profeweb']);
    }
  }

  ngOnDestroy() {
    this.stateService.profeDataGetTema.set(null);
    this.destroyAudio();
  }


  /*************************/
  /*   LLAMADAS A LA API   */
  /*************************/
  // descarga un tema
  async getTemaProfe() {
    this.stateService.loadingSpinner.set(true);

    // el flujo se detiene hasta que el servicio termine de hacer el relogin y retorne el resultado
    let reloginOk = await this.reloginService.relogin();
    console.log('Promise profeweb termino con: ', reloginOk);

    if (reloginOk) {
      this.getTemaProfeService.getTemaProfe(this.profeDataGetTema).subscribe(
        {
          next: (response) => {
            this.stateService.loadingSpinner.set(false);

            if (response.status === 200) {
              console.log(response.body);

              if (response.body.id_curso) {

                this.profeTema = response.body;
                this.stateService.profeDataGetTema.set(null);

                this.profeTema?.elementos.map((elemento, index) => {
                  if (elemento.texto_epigrafe.length > 0) { this.listaDeEpigrafes.push([index, elemento.texto_epigrafe]) };
                  this.listaDeElementos.push([elemento.tipo, elemento.thumbnail]);
                })

                this.elementosEstudiadosList = new Array(this.profeTema?.elementos.length).fill(false);
                this.temaLoaded.set(true);
                this.isPlaying.set(true);
                this.loadSound(this.profeTema?.elementos[0]?.sonido ?? '');

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
    } else {
      this.stateService.loadingSpinner.set(false);
      console.log('relogin profeweb devolvio false');
    }
  }

  // graba el tema como visto => sin relogin por servicio critico
  setReproduccionTemaProfe() {
    // this.stateService.loadingSpinner.set(true);
    const DATA: DataSetReproduccionTemaProfe = {
      cdicurso: this.profeDataGetTema.cdicurso,
      cdicategoria: this.profeDataGetTema.cdicategoria,
      cditema: this.profeDataGetTema.cditema,
      pwa: this.stateService.deviceSystem() === DeviceSystem.iOS ? 'pwi' : 'pwa'
    }

    this.setReproduccionTemaProfeService.setReproduccionTemaProfe(DATA).subscribe(
      {
        next: (response) => {
          // this.stateService.loadingSpinner.set(false);

          if (response.status === 200) {
            console.log(response.body);

            if (response.body.reproduccion.length > 0) {

              this.setTemaReproducido(DATA.cditema);
              this.showInfoSnackbar(`Enhorabuena, has superado el ${this.profeTema?.umbral}% del tema`);

            } else {
              console.log('response', response.body.message);
              this.router.navigate(['concurrencia', response.body.message]);
            }
          }
        },
        error: (error) => {
          // this.stateService.loadingSpinner.set(false);
          console.log('error: ', error.message);
          this.router.navigate(['error']);
        }
      }
    )
  }

  setTemaReproducido(cditema: number) {
    const temaEstudiado = this.stateService.alumnoLogeado()?.profeweb
      ?.flatMap(profeweb => profeweb.profes)
      ?.flatMap(profe => profe.categorias)
      ?.flatMap(categoria => categoria.temas)
      ?.find(tema => tema.cdi.toString() === cditema.toString());

    if (temaEstudiado) { temaEstudiado.reproducido = 1 }
    console.log('temaEstudiado', temaEstudiado?.titulo);
  }



  /**********************************/
  /*    GESTION DEL AUDIO PLAYER    */
  /**********************************/
  setAudioPlayer() {
    this.audioPlayer.preload = 'auto';
    this.audioPlayer.loop = false;

    // Escuchar eventos
    this.audioPlayer.addEventListener('ended', () => { console.log('El audio terminó') })
  }

  loadSound(sound: string) {
    this.audioPlayer.src = sound;
    if (this.isPlaying()) { this.play() }
  }

  repeatSound() {
    this.stop();
    this.play();
  }

  muteSound() {
    this.isMuted.set(!this.isMuted());
    this.audioPlayer.muted = this.isMuted();
  }

  destroyAudio() {
    this.stop();
    this.audioPlayer.src = '';
    this.audioPlayer.load();
  }

  play() {
    this.isPlaying.set(true);
    this.audioPlayer.play();
  }

  pause() {
    this.isPlaying.set(false);
    this.audioPlayer.pause();
  }

  stop() {
    this.pause();
    this.audioPlayer.currentTime = 0;
  }



  /**********************************/
  /*   GESTION DE ELEMENTO ACTIVO   */
  /**********************************/
  // chequea si ya se supero el umbral de estudio del tema
  checkUmbralTema() {
    const UMBRAL_INDEX = Math.round((this.profeTema?.umbral ?? 0) * (this.profeTema?.elementos?.length ?? 0) / 100);
    console.log('UMBRAL_INDEX', UMBRAL_INDEX);

    let count = 0;
    this.elementosEstudiadosList.map(elemento => { if (elemento) { count++ } });
    if (count >= UMBRAL_INDEX) {
      this.temaEstudiado.set(true);
      this.setReproduccionTemaProfe();
    }
  }

  clickEpigrafes() {
    if (this.listaDeEpigrafes.length > 0) {
      this.dialog.closeAll();
      this.showListaElementos.set(false);
      this.showListaEpigrafes.set(true);
    } else {
      this.showInfoSnackbar('Este tema no tiene epígrafes');
    }
  }

  clickGoToEpigrafe(index: number) {
    this.indexEA.set(index);
    this.closeListaEpigrafes();
    this.loadSound(this.profeTema?.elementos[this.indexEA()]?.sonido ?? '');
  }

  closeListaEpigrafes() {
    this.showListaEpigrafes.set(false);
  }

  clickElementos() {
    this.dialog.closeAll();
    this.showListaEpigrafes.set(false);
    this.showListaElementos.set(true);
  }

  clickGoToElemento(index: number) {
    this.indexEA.set(index);
    this.closeListaElementos();
    this.loadSound(this.profeTema?.elementos[this.indexEA()]?.sonido ?? '');
  }

  closeListaElementos() {
    this.showListaElementos.set(false);
  }


  /******************************/
  /*   GESTION DE MENU HEADER   */
  /******************************/
  headerNavigateBack() {
    this.popUpNavigateBack(
      'Terminar el tema',
      'Vas a salir del tema. ¿Deseas continuar?',
      0
    )
  }

  headerShowInfo() {
    this.popUpNavigateBack(
      this.profeTema?.nombre_tema ?? '',
      this.profeTema?.descripcion_tema ?? '',
      1
    )
  }

  headerGoToTest() {
    this.popUpNavigateBack(
      'Realizar el test',
      'Vas a realizar el test de este tema. ¿Deseas continuar?',
      2
    )
  }


  /******************************/
  /*   GESTION DE MENU BOTTOM   */
  /******************************/
  clickAtras() {
    if (this.indexEA() > 0) {
      this.indexEA.set(this.indexEA() - 1);
      this.loadSound(this.profeTema?.elementos[this.indexEA()]?.sonido ?? '');
    }
  }

  clickAlante() {
    const totalElementos = this.profeTema?.elementos?.length ?? 0;
    if (totalElementos > 0 && (this.indexEA() < (totalElementos - 1))) {
      this.indexEA.set(this.indexEA() + 1);
      this.loadSound(this.profeTema?.elementos[this.indexEA()]?.sonido ?? '');
    }
  }

  clickPausa(playingState: boolean) {
    playingState ? this.play() : this.pause();
  }

  clickRepetir(playingState: boolean) {
    if (playingState) { this.repeatSound(); }
  }

  clickSonido() {
    this.muteSound();
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

  popUpNavigateBack(titulo: string, mensaje: string, origen: number) {
    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo: titulo,
        mensaje: mensaje,
        modo: origen === 1 ? 0 : 1,
        tipo: origen === 1 ? 0 : 1
      }
    });

    // al cerrar popup ...
    dialogRef.afterClosed().subscribe(
      (respuesta) => {
        if (respuesta.accion) {
          switch (origen) {
            case 0:
              this.navigateBack();
              break;

            case 2:
              // cargar test tema
              this.getTestPredefinido();
              break;

            default:
              break;
          }
        }
      })
  }

  getTestPredefinido() {
    const DATA: DataTestPredefinidoTemaProfe = {
      cditest_tema: this.profeTema?.cditest ?? 0,
      traducir: this.profeTema?.traducir ?? 0,
      idioma: this.profeTema?.idioma ?? '',
      ayuda: this.profeTema?.ayuda ?? 0,
      autocorreccion: this.profeTema?.autocorreccion ?? 0,
      propia: 0
    }

    this.stateService.testPredefinidoTemaProfeSelected.set(DATA);
    this.stateService.serviceSelected.set(Servicio.TestPredefinidos);
    this.router.navigate(['test', TipoTest.TestPredefinido]);
  }

  navigateBack() {
    this.router.navigate(['/dashboard/profeweb']);
  }
}
