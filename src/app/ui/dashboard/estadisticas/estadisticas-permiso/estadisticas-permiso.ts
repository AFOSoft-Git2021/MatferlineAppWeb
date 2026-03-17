import { Component, computed, inject, input } from '@angular/core';
import { StateService } from '../../../../data/repository/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas-permiso',
  imports: [CommonModule],
  templateUrl: './estadisticas-permiso.html',
  styleUrl: './estadisticas-permiso.scss',
})
export class EstadisticasPermisoCabecera {

  private stateService = inject(StateService); 

  nombrecurso = input.required<string>();
  nombrepermiso = input.required<string>();
  icono = input.required<string>();
  indexColor = input.required<number>();

  colorList = computed(() => this.stateService.colorList[this.indexColor()]);
}
