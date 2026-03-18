import { Component, computed, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-estadisticas',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, DashboardAppBar, EstadisticasTitulo, EstadisticasResumen, EstadisticasPermisoCabecera, EstadisticasGrafica, EstadisticasListaTest],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
})
export class Estadisticas implements OnInit {

  private stateService = inject(StateService);
  private getEstadisticasService = inject(GetEstadisticasService);
  private router = inject(Router);

  dataEstadisticas: any;
  servicioSeleccionado = computed(() => { return `Test ${this.stateService.serviceSelected()}` });
  estadisticas: EstadisticasPermiso | null = null;

  ngOnInit() {
    this.dataEstadisticas = this.stateService.dataEstadisticas() as DataGetEstadisticas;
    console.log(this.dataEstadisticas);
    
    this.getEstadisticas(this.dataEstadisticas);
  }

  /*************************/
  /*   LLAMADAS A LA API   */
  /*************************/

  getEstadisticas(data: DataGetEstadisticas) {
    this.stateService.loadingSpinner.set(true);
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
  }

  getTestRegenerado(event: any) {
    const cdiTest = event.cditest;
    const tipoTest = event.tipo;
    console.log(`cditest: ${cdiTest} tipo: ${tipoTest}`);
  }



  /*****************************/
  /*    METODOS ESTADISTICAS   */
  /*****************************/
  navigateBack() {
    this.router.navigate(['/dashboard/aleatorios']);
  }

}
