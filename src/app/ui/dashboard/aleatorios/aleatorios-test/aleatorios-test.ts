import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BotonExamenEstudio } from '../../boton-examen-estudio/boton-examen-estudio';
import { BotonSinAyuda } from '../../boton-sin-ayuda/boton-sin-ayuda';
import { CabeceraCategoria } from '../../cabecera-categoria/cabecera-categoria';
import { CabeceraPermiso } from '../../cabecera-permiso/cabecera-permiso';
import { DashboardAppBar } from '../../dashboard-app-bar/dashboard-app-bar';
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { AleatorioPermiso } from '../../../../data/model/aleatorioPermiso';
import { ItemListaTestAleatorio } from "../item-lista-test-aleatorio/item-lista-test-aleatorio";
import { BotonTestAleatorio } from "../boton-test-aleatorio/boton-test-aleatorio";
import { DataTestAleatorio } from '../../../../data/model/dataTestAleatorio';
import { AleatorioPermisoTestTematicoCategoria } from '../../../../data/model/aleatorioPermisoTestTematicoCategoria';
import { TipoTest } from '../../../../data/model/tipoTestEnum';

@Component({
  selector: 'app-aleatorios-test',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    DashboardAppBar,
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
  idCurso = '';
  permiso: AleatorioPermiso | null = null;

  ngOnInit() {
    const ALEATORIOS = this.stateService.alumnoLogeado()?.aleatorios;
    if (ALEATORIOS) {
      for (const aleatorio of ALEATORIOS) {
        if (aleatorio.cdi.toString() === this.cdicurso()) {
          this.nombreCurso = aleatorio.nombre;
          this.idCurso = aleatorio.id;
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

  getTestAleatorio(autocorreccion: any, tipo: number, categoria: AleatorioPermisoTestTematicoCategoria | null) {
    console.log(tipo !== 2 ? autocorreccion : this.autocorreccionState() + '/' + tipo);

    const DATA: DataTestAleatorio = {
      cdicurso: parseInt(this.cdicurso()),
      id_curso: this.idCurso,
      nombre_curso: this.nombreCurso,
      cdipermiso: parseInt(this.cdipermiso()),
      nombre_permiso: this.permiso?.nombre ?? '',
      cdicategoria: categoria?.cdi ?? 0,
      nombre_categoria: categoria?.nombre ?? '',
      descripcion_categoria: categoria?.descripcion ?? '',
      traducir: this.idiomaSelected() === 0 ? 0 : 1,
      idioma: this.idiomaSelected() === 1 ? this.stateService.alumnoLogeado()?.idioma.code ?? '' : '',
      ayuda: tipo === 2 ? this.permiso?.test_tematicos?.ayuda ?? 1 : tipo === 0 ? this.permiso?.test_examen?.ayuda ?? 1 : 1,
      autocorreccion: tipo === 2 ? this.autocorreccionState() : autocorreccion,
      tipo_test: tipo
    }

    this.stateService.testAleatorioSelected.set(DATA);
    this.router.navigate(
      ['test', tipo === 0 ? TipoTest.TestAleatorioExamen : tipo === 1 ? TipoTest.TestAleatorioPreguntasFalladas : TipoTest.TestAleatorioTematico]
    );
  }

}
