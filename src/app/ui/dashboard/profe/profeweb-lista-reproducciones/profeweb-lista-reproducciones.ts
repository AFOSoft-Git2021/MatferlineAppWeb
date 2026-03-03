import { Component, inject, input, OnInit } from '@angular/core';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { GetReproduccionesTemaProfeService } from '../../../../data/repository/getReproduccionesTemaProfe.service';
import { DataGetProfeReproduccion } from '../../../../data/model/dataGetProfeReproduccion';
import { DataProfeReproduccion } from '../../../../data/model/dataProfeReproduccion';

@Component({
  selector: 'app-profeweb-lista-reproducciones',
  imports: [DashboardAppBar],
  templateUrl: './profeweb-lista-reproducciones.html',
  styleUrl: './profeweb-lista-reproducciones.scss',
})
export class ProfewebListaReproducciones implements OnInit {

  private router = inject(Router);
  private stateService = inject(StateService);
  private getReproduccionesTemaProfeService = inject(GetReproduccionesTemaProfeService);

  data = input.required<string>();
  nombreProfe = '';
  nombreProfeweb = '';
  nombreCategoria = '';
  index = 0
  icono = '';
  cdicurso = 0;
  cdiprofe = 0;
  cdicategoria = 0;

  listaReproducciones: DataProfeReproduccion[] = [];

  ngOnInit() {
    console.log(this.data());
    const DATA = this.data().split('***');
    this.nombreProfe = DATA[0];
    this.nombreProfeweb = DATA[1];
    this.nombreCategoria = DATA[2];
    this.index = parseInt(DATA[3]);
    this.icono = DATA[4];
    this.cdicurso = parseInt(DATA[5]);
    this.cdiprofe = parseInt(DATA[6]);
    this.cdicategoria = parseInt(DATA[7]);

    this.getReproduccionesTemaProfe();
  }

  getReproduccionesTemaProfe() {
    const data: DataGetProfeReproduccion = {
      cdicurso: this.cdicurso,
      cdiprofe: this.cdiprofe,
      cdicategoria: this.cdicategoria
    }
    this.stateService.loadingSpinner.set(true);
    this.getReproduccionesTemaProfeService.getReproduccionesTemaProfe(data).subscribe(
      {
        next: (response) => {
          this.stateService.loadingSpinner.set(false);

          if (response.status === 200) {
            console.log(response.body);
            

            if (response.body.reproducciones) {

              // procesar response.body para crear la lista de reproducciones
              this.listaReproducciones = response.body.reproducciones;

            } else {
              console.log('response', response.body.message);
              /* this.popUpConfirm(
                'Atención',
                response.body.message ?? 'Login incorrecto. Inténtalo de nuevo.',
                1,
                0
              ) */
            }
          }
        },
        error: (error) => {
          this.stateService.loadingSpinner.set(false);
          console.log('error: ', error.message);
          /* this.popUpConfirm(
            'Atención',
            error.message ?? 'Login incorrecto. Inténtalo de nuevo.',
            1,
            0
          ) */
        }
      }
    )
  }

  navigateBack() {
    this.router.navigate(['/dashboard/profeweb']);
  }

}
