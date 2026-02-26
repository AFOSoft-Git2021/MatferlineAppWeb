import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { PredefinidoPermisoCategoria } from '../../../../data/model/predefinidoPermisoCategoria';
import { PredefinidoPermiso } from '../../../../data/model/predefinidoPermiso';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { ItemListaTest } from "../item-lista-test/item-lista-test";
import { CabeceraCategoria } from "../../cabecera-categoria/cabecera-categoria";
import { CabeceraPermiso } from "../../cabecera-permiso/cabecera-permiso";
import { BotonExamenEstudio } from "../../boton-examen-estudio/boton-examen-estudio";
import { BotonSinAyuda } from "../../boton-sin-ayuda/boton-sin-ayuda";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-predefinidos-test',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    DashboardAppBar,
    ItemListaTest,
    CabeceraCategoria,
    CabeceraPermiso,
    BotonExamenEstudio,
    BotonSinAyuda
  ],
  templateUrl: './predefinidos-test.html',
  styleUrl: './predefinidos-test.scss',
})
export class PredefinidosTest implements OnInit {

  private router = inject(Router);
  public stateService = inject(StateService);
  private matSnackbar = inject(MatSnackBar);

  cdicurso = input.required<string>();
  cdipermiso = input.required<string>();
  listaCategorias: PredefinidoPermisoCategoria[] = [];
  showState = signal<boolean[]>([]);
  autocorreccionState = signal<number[]>([]);
  idiomaSelected = signal(0);

  nombreCurso = '';
  permiso: PredefinidoPermiso | null = null;

  ngOnInit() {
    const PREDEFINIDOS = this.stateService.alumnoLogeado()?.predefinidos;
    if (PREDEFINIDOS) {
      for (const predefinido of PREDEFINIDOS) {
        if (predefinido.cdi.toString() === this.cdicurso()) {
          this.nombreCurso = predefinido.nombre;
          for (const permiso of predefinido.permisos) {
            if (permiso.cdi.toString() === this.cdipermiso()) {
              this.permiso = permiso;
              this.listaCategorias = permiso.categorias;
              break;
            }
          }
          break;
        }
      }

      this.showState.set(new Array(this.listaCategorias.length).fill((this.listaCategorias.length === 1) ? true : false));
      console.log(this.showState());

      this.autocorreccionState.set(new Array(this.listaCategorias.length).fill(0));
    }
  }

  navigateBack() {
    this.router.navigate(['/dashboard/predefinidos']);
  }

  navigateEstadisticas() {
    this.router.navigate(['/dashboard/estadisticas']);
  }

  showTestCategoria(index: number) {
    this.showState()[index] = !this.showState()[index];
  }

  setAutocorreccionCategoria(index: number, value: number) {
    this.autocorreccionState()[index] = value;
  }

  showInfoAyudaCategoria() {
    this.matSnackbar.open('Test sin ayuda en las preguntas', 'Ok', {
      duration: this.stateService.snackBarTime
    })
  }

  setIiomaSelected(index: number) {
    this.idiomaSelected.set(index);
  }

  getTestPredefinido(event: any) {
    console.log(event);
  }

}
