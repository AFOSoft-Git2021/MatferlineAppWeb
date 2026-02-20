import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Servicio } from '../../../data/model/servicioEnum';

@Component({
  selector: 'app-dashboard-bottom-navigation',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dashboard-bottom-navigation.html',
  styleUrl: './dashboard-bottom-navigation.scss',
})
export class DashboardBottomNavigation {

  public Servicio = Servicio;
  optionBottomMenuEmitter = output<Servicio>();

  gotoServicio(servicio: Servicio) {
    console.log(servicio);
    
    this.optionBottomMenuEmitter.emit(servicio);
  }

}
