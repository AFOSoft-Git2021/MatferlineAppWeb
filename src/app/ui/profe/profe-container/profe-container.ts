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
import { AudioService } from '../../../domain-usecase/profe/audio.service';

@Component({
  selector: 'app-profe-container',
  imports: [TopAppBarLogged, ProfeBottomMenu, ProfeMenuHeader, ProfeElementoActivo],
  templateUrl: './profe-container.html',
  styleUrl: './profe-container.scss',
  providers: [AudioService]
})
export class ProfeContainer implements OnInit, OnDestroy {

  private router = inject(Router);
  private stateService = inject(StateService);
  private getTemaProfeService = inject(GetTemaProfeService);
  private dialog = inject(MatDialog);
  private matSnackbar = inject(MatSnackBar);
  private audioService = inject(AudioService);

  alumno = computed(() => this.stateService.alumnoLogeado());
  profeDataGetTema: any;
  profeTema: ProfeTema | null = null;
  temaLoaded = signal(false);
  indexEA = signal(0);

  showListaElementos = signal(false);
  showListaEpigrafes = signal(false);
  listaDeEpigrafes: [number, string][] = [];

  constructor() {
    effect(() => {
      if (this.temaLoaded()) {
        this.audioService.loadSound(this.profeTema?.elementos[this.indexEA()]?.sonido ?? '');
        this.audioService.play();
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
    this.audioService.destroyAudio();
  }


  /*************************/
  /*   LLAMADAS A LA API   */
  /*************************/
  // descarga un tema
  getTemaProfe() {
    this.stateService.loadingSpinner.set(true);
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
                if (elemento.texto_epigrafe.length > 0) { this.listaDeEpigrafes.push([index, elemento.texto_epigrafe]) }
              })
              console.log(this.listaDeEpigrafes);

              this.temaLoaded.set(true);

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


  /**********************************/
  /*   GESTION DE ELEMENTO ACTIVO   */
  /**********************************/
  clickEpigrafes() {
    this.showListaElementos.set(false);
    this.showListaEpigrafes.set(true);
  }

  clickElementos() {
    this.showListaEpigrafes.set(false);
    this.showListaElementos.set(true);
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
    }
  }

  clickAlante() {
    const totalElementos = this.profeTema?.elementos?.length ?? 0;
    if (totalElementos > 0 && (this.indexEA() < (totalElementos - 1))) {
      this.indexEA.set(this.indexEA() + 1);
    }
  }

  clickPausa() {
    this.audioService.managePlaying();
  }

  clickRepetir() {
    this.audioService.repeatSound();
  }

  clickSonido() {
    this.audioService.muteSound();
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
              // TODO: cargar test tema;
              break;
          }
        }
      })
  }

  navigateBack() {
    // TODO: reset de players y otras variables ???
    this.router.navigate(['/dashboard/profeweb']);
  }
}
