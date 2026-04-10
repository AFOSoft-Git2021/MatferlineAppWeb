import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../../../data/repository/state.service';
import { GetEstadisticasService } from '../../../../data/repository/get-estadisticas.service';
import { Router } from '@angular/router';
import { DataGetEstadisticas } from '../../../../data/model/dataGetEstadisticas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { EstadisticasTitulo } from "../estadisticas-titulo/estadisticas-titulo";
import { EstadisticasResumen } from "../estadisticas-resumen/estadisticas-resumen";
import { EstadisticasPermiso } from '../../../../data/model/estadisticasPermiso';
import { EstadisticasPermisoCabecera } from "../estadisticas-permiso/estadisticas-permiso";
import { EstadisticasGrafica } from "../estadisticas-grafica/estadisticas-grafica";
import { EstadisticasListaTest } from "../estadisticas-lista-test/estadisticas-lista-test";
import { TipoTest } from '../../../../data/model/tipoTestEnum';
import { GetTestRegeneradoService } from '../../../../data/repository/get-test-regenerado.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from '../../../shared/popup-confirm/popup-confirm.component';
import { Servicio } from '../../../../data/model/servicioEnum';
import { TestRegenerado } from '../../../../data/model/testRegenerado';
import { ReloginService } from '../../../../data/repository/relogin.service';

@Component({
  selector: 'app-estadisticas',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    DashboardAppBar,
    EstadisticasTitulo,
    EstadisticasResumen,
    EstadisticasPermisoCabecera,
    EstadisticasGrafica,
    EstadisticasListaTest
  ],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
})
export class Estadisticas implements OnInit, OnDestroy {

  private stateService = inject(StateService);
  private getEstadisticasService = inject(GetEstadisticasService);
  private reloginService = inject(ReloginService);
  private getTestRegeneradoService = inject(GetTestRegeneradoService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  dataEstadisticas: any;
  servicioSeleccionado = computed(() => { return `Test ${this.stateService.serviceSelected()}` });
  estadisticas: EstadisticasPermiso | null = null;

  ngOnInit() {
    this.dataEstadisticas = this.stateService.dataEstadisticas() as DataGetEstadisticas;
    console.log(this.dataEstadisticas);

    this.getEstadisticas(this.dataEstadisticas);
  }

  ngOnDestroy() {
    this.stateService.dataEstadisticas.set(null);
  }

  /*************************/
  /*   LLAMADAS A LA API   */
  /*************************/
  async getEstadisticas(data: DataGetEstadisticas) {
    this.stateService.loadingSpinner.set(true);

    // el flujo se detiene hasta que el servicio termine de hacer el relogin y retorne el resultado
    let reloginOk = await this.reloginService.relogin();
    console.log('Promise estadisticas termino con: ', reloginOk);

    if (reloginOk) {
      this.getEstadisticasService.getEstadisticas(data).subscribe(
        {
          next: (response) => {
            this.stateService.loadingSpinner.set(false);

            if (response.status === 200) {
              console.log(response.body);

              if (response.body.num_test_aleatorios >= 0) {

                this.estadisticas = response.body as EstadisticasPermiso;
                this.stateService.dataEstadisticas.set(null);

              } else {
                console.log('response', response.body.message);
                this.router.navigate(['concurrencia', response.body.message ?? 'Oops ... algo ha ido mal']);
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
      console.log('relogin estadisticas devolvio false');
    }
  }

  async getTestRegenerado(event: any) {
    this.stateService.loadingSpinner.set(true);

    // el flujo se detiene hasta que el servicio termine de hacer el relogin y retorne el resultado
    let reloginOk = await this.reloginService.relogin();
    console.log('Promise regenerado termino con: ', reloginOk);

    if (reloginOk) {

      const cdiTest = event.cditest as string;
      const tipoTest = event.tipo as string;
      console.log(`cditest: ${cdiTest} tipo: ${tipoTest}`);

      const DATA = { cditest: cdiTest }

      this.getTestRegeneradoService.getTestRegenerado(JSON.stringify(DATA)).subscribe(
        {
          next: (response) => {
            this.stateService.loadingSpinner.set(false);

            if (response.status === 200) {
              console.log(response.body);

              if (response.body.test) {

                const TEST_REGENERADO: TestRegenerado = {
                  test: response.body.test,
                  correccion: response.body.correccion
                }

                this.stateService.testRegeneradoSelected.set(TEST_REGENERADO);
                const TIPO_TEST = tipoTest.toLowerCase().includes('predefinido') ? TipoTest.TestPredefinido : TipoTest.TestAleatorio;
                this.router.navigate(['test', TIPO_TEST]);

              } else {
                this.popUpTestNoEncontrado(response.body.message);
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
      console.log('relogin regenerado devolvio false');
    }
  }

  /*************************/
  /*   GESTION DE POPUPS   */
  /*************************/
  // Alert de test no encontrado
  popUpTestNoEncontrado(mensaje: string) {
    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo: 'Oops ...',
        mensaje: mensaje,
        modo: 1,
        tipo: 0
      }
    })
  }

  /*****************************/
  /*    METODOS ESTADISTICAS   */
  /*****************************/
  navigateBack() {
    const SERVICIO = this.stateService.serviceSelected();
    const ROUTE = SERVICIO === Servicio.TestPredefinidos ? 'predefinidos' : 'aleatorios';
    this.router.navigate([`/dashboard/${ROUTE}`]);
  }

}