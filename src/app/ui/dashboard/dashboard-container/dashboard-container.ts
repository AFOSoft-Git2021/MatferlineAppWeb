import { Component, computed, inject, OnInit } from '@angular/core';
import { TopAppBarLogged } from "../../shared/top-app-bar-logged/top-app-bar-logged";
import { Router, RouterOutlet } from "@angular/router";
import { StateService } from '../../../data/repository/state.service';
import { DashboardBottomNavigation } from "../dashboard-bottom-navigation/dashboard-bottom-navigation";
import { Servicio } from '../../../data/model/servicioEnum';
import { Alumno } from '../../../data/model/alumno';

@Component({
  selector: 'app-dashboard-container',
  imports: [TopAppBarLogged, RouterOutlet, DashboardBottomNavigation],
  templateUrl: './dashboard-container.html',
  styleUrl: './dashboard-container.scss',
})
export class DashboardContainer implements OnInit {

  private stateService = inject(StateService);
  private router = inject(Router);
  alumno: (Alumno | null) = null;
  listaServicios: Servicio[] = [];

  ngOnInit() {
    this.alumno = this.stateService.alumnoLogeado();

    if (this.alumno) {
      if (this.alumno.predefinidos && this.alumno.predefinidos.length > 0) {
        this.listaServicios.push(Servicio.TestPredefinidos);
      }
       if (this.alumno.aleatorios && this.alumno.aleatorios.length > 0) {
        this.listaServicios.push(Servicio.TestAleatorios);
      }
       if (this.alumno.profeweb && this.alumno.profeweb.length > 0) {
        this.listaServicios.push(Servicio.Profeweb);
      }
    }
    console.log(this.listaServicios);
  }

  navigateService(servicio: Servicio) {
    switch (servicio) {
      case Servicio.TestAleatorios:
        this.router.navigate(['dashboard/aleatorios']);
        break;
      case Servicio.TestPredefinidos:
        this.router.navigate(['dashboard/predefinidos']);
        break;
      case Servicio.Profeweb:
        this.router.navigate(['dashboard/profeweb']);
        break;
    }
  }

}
