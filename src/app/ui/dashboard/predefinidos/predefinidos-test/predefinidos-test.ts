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
import { DataTestPredefinido } from '../../../../data/model/dataTestPredefinidos';
import { TipoTest } from '../../../../data/model/tipoTestEnum';

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

  indexColor = input.required<number>();
  cdicurso = input.required<string>();
  cdipermiso = input.required<string>();
  listaCategorias: PredefinidoPermisoCategoria[] = [];
  showState = signal<boolean[]>([]);
  autocorreccionState = signal<number[]>([]);
  idiomaSelected = signal(0);

  nombreCurso = '';
  idCurso = '';
  permiso: PredefinidoPermiso | null = null;

  ngOnInit() {
    const PREDEFINIDOS = this.stateService.alumnoLogeado()?.predefinidos;
    if (PREDEFINIDOS) {
      for (const predefinido of PREDEFINIDOS) {
        if (predefinido.cdi.toString() === this.cdicurso()) {
          this.nombreCurso = predefinido.nombre;
          this.idCurso = predefinido.id;
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

  setIidiomaSelected(index: number) {
    this.idiomaSelected.set(index);
  }

  getTestPredefinido(indexCategoria: number, indexTest: number) {
    console.log(`indexTest: ${indexTest}`);
    
    const CATEGORIA = this.listaCategorias[indexCategoria];
    const TEST = CATEGORIA.test[indexTest];

    const DATA: DataTestPredefinido = {
      cdicurso: parseInt(this.cdicurso()),
      nombre_curso: this.nombreCurso,
      cdipermiso: parseInt(this.cdipermiso()),
      nombre_permiso: this.permiso?.nombre ?? '',
      cdicategoria: CATEGORIA.cdicategoria,
      nombre_categoria: CATEGORIA.nombre,
      cditest: TEST.cdi,
      nombre_test: TEST.nombre,
      descripcion_test: TEST.descripcion,
      ayuda: CATEGORIA.ayuda,
      autocorreccion: this.autocorreccionState()[indexCategoria],
      propia: CATEGORIA.propia,
      id_curso: this.idCurso,
      traducir: this.idiomaSelected() === 1 ? 1 : 0,
      idioma: this.idiomaSelected() === 1 ? this.stateService.alumnoLogeado()?.idioma.code ?? '' : ''
    }

    this.stateService.testPredefinidoSelected.set(DATA);
    this.router.navigate(['test', TipoTest.TestPredefinido]);
  }

}
