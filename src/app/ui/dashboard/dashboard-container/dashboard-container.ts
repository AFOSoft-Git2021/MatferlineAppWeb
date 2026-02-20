import { Component, computed, inject } from '@angular/core';
import { TopAppBarLogged } from "../../shared/top-app-bar-logged/top-app-bar-logged";
import { Router, RouterOutlet } from "@angular/router";
import { StateService } from '../../../data/repository/state.service';
import { DashboardBottomNavigation } from "../dashboard-bottom-navigation/dashboard-bottom-navigation";
import { Servicio } from '../../../data/model/servicioEnum';

@Component({
  selector: 'app-dashboard-container',
  imports: [TopAppBarLogged, RouterOutlet, DashboardBottomNavigation],
  templateUrl: './dashboard-container.html',
  styleUrl: './dashboard-container.scss',
})
export class DashboardContainer {

  private stateService = inject(StateService);
  private router = inject(Router);

  alumno = this.stateService.alumnoLogeado();

  navigateService(servicio: Servicio) {
    console.log('navigateService', servicio);
    
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
