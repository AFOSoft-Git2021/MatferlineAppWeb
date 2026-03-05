import { Component, inject, input, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-test-container',
  imports: [TopAppBarLogged, TestBottomMenu, TestMenuHeader],
  templateUrl: './test-container.html',
  styleUrl: './test-container.scss',
})
export class TestContainer implements OnInit {

  private stateService = inject(StateService);
  private getTestPredefinidoService = inject(GetTestPredefinidoService);
  private router = inject(Router);

  tipo = input.required<TipoTest>();
  testLoaded = signal(false);

  alumno: (Alumno | null) = null;
  test: any;

  ngOnInit() {
    console.log(this.tipo());

    this.alumno = this.stateService.alumnoLogeado();

    if (this.tipo() === TipoTest.TestPredefinido) {
      const DATA_PREDEFINIDO = this.stateService.testPredefinidoSelected();
      if (DATA_PREDEFINIDO) {
        this.getTestPredefinido(DATA_PREDEFINIDO);
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



  /********************************/
  /* GESTION DEL TEST MENU HEADER */
  /********************************/
  navigateBack() {
    const ROUTE = this.tipo() === TipoTest.TestPredefinido ? '/dashboard/predefinidos' : '/dashboard/aleatorios';
    this.router.navigate([ROUTE]);
  }





  /***************************/
  /* GESTION DEL BOTTOM MENU */
  /***************************/
  clickOptionBottomMenu(option: number) {
    alert(option);
  }

}
