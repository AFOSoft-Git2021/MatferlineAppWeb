import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Servicio } from '../../../data/model/servicioEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-bottom-navigation',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-bottom-navigation.html',
  styleUrl: './dashboard-bottom-navigation.scss',
})
export class DashboardBottomNavigation implements OnInit {

  public Servicio = Servicio;
  servicioSeleccionado = input.required<Servicio>();
  serviciosDisponibles = input.required<Servicio[]>();
  optionBottomMenuEmitter = output<Servicio>();

  servicioActual = computed(() => {
    let indexServicio = 0;
    switch (this.servicioSeleccionado()) {
      case Servicio.TestPredefinidos:
        indexServicio = 0;
        break;

      case Servicio.TestAleatorios:
        indexServicio = 1;
        break;

      case Servicio.Profeweb:
        indexServicio = 2;
        break;
    }
    return indexServicio;
  })

  listaIconos: string[] = [];

  ngOnInit() {
    this.serviciosDisponibles().map((_, index) => {
      switch (index) {
        case 0:
          this.listaIconos.push('icon_predefinidos.svg');
          break;

        case 1:
          this.listaIconos.push('icon_aleatorios.svg');
          break;

        case 2:
          this.listaIconos.push('icon_profeweb.svg');
          break;
      }
    })
  }

  gotoServicio(servicio: Servicio) {
    this.optionBottomMenuEmitter.emit(servicio);
  }

}
