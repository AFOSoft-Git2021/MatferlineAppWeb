import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BotonExamenEstudio } from '../../boton-examen-estudio/boton-examen-estudio';
import { BotonSinAyuda } from '../../boton-sin-ayuda/boton-sin-ayuda';
import { CabeceraCategoria } from '../../cabecera-categoria/cabecera-categoria';
import { CabeceraPermiso } from '../../cabecera-permiso/cabecera-permiso';
import { DashboardAppBar } from '../../dashboard-app-bar/dashboard-app-bar';
import { ItemListaTest } from '../../predefinidos/item-lista-test/item-lista-test';
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { PredefinidoPermiso } from '../../../../data/model/predefinidoPermiso';
import { PredefinidoPermisoCategoria } from '../../../../data/model/predefinidoPermisoCategoria';
import { AleatorioPermisoTestTematicoCategoria } from '../../../../data/model/aleatorioPermisoTestTematicoCategoria';
import { AleatorioPermiso } from '../../../../data/model/aleatorioPermiso';
import { ItemListaTestAleatorio } from "../item-lista-test-aleatorio/item-lista-test-aleatorio";
import { BotonTestAleatorio } from "../boton-test-aleatorio/boton-test-aleatorio";

@Component({
  selector: 'app-aleatorios-test',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    DashboardAppBar,
    ItemListaTest,
    CabeceraCategoria,
    CabeceraPermiso,
    BotonExamenEstudio,
    BotonSinAyuda,
    ItemListaTestAleatorio,
    BotonTestAleatorio
],
  templateUrl: './aleatorios-test.html',
  styleUrl: './aleatorios-test.scss',
})
export class AleatoriosTest implements OnInit {

  private router = inject(Router);
  public stateService = inject(StateService);
  private matSnackbar = inject(MatSnackBar);

  indexColor = input.required<number>();
  cdicurso = input.required<string>();
  cdipermiso = input.required<string>();
  showState = signal(true);
  autocorreccionState = signal(0);
  idiomaSelected = signal(0);

  nombreCurso = '';
  permiso: AleatorioPermiso | null = null;

  ngOnInit() {
    const ALEATORIOS = this.stateService.alumnoLogeado()?.aleatorios;
    if (ALEATORIOS) {
      for (const aleatorio of ALEATORIOS) {
        if (aleatorio.cdi.toString() === this.cdicurso()) {
          this.nombreCurso = aleatorio.nombre;
          for (const permiso of aleatorio.permisos) {
            if (permiso.cdi.toString() === this.cdipermiso()) {
              this.permiso = permiso;              
              break;
            }
          }
          break;
        }
      }
    }
  }

  navigateBack() {
    this.router.navigate(['/dashboard/aleatorios']);
  }

  navigateEstadisticas() {
    this.router.navigate(['/dashboard/estadisticas']);
  }

  showTestCategoria() {
    this.showState.set(!this.showState());
  }

  setAutocorreccionCategoria(value: number) {
    this.autocorreccionState.set(value);
  }

  showInfoAyudaCategoria() {
    this.matSnackbar.open('Test sin ayuda en las preguntas', 'Ok', {
      duration: this.stateService.snackBarTime
    })
  }

  setIiomaSelected(index: number) {
    this.idiomaSelected.set(index);
  }

  getTestAleatorio(event: any , tipo: number) {
    console.log(event + '/' + tipo);
  }
}
