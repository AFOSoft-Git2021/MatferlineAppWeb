import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { EstadisticasGraficaCanvas } from "../estadisticas-grafica-canvas/estadisticas-grafica-canvas";

@Component({
  selector: 'app-estadisticas-grafica',
  imports: [CommonModule, EstadisticasGraficaCanvas],
  templateUrl: './estadisticas-grafica.html',
  styleUrl: './estadisticas-grafica.scss',
})
export class EstadisticasGrafica {

  aptos = input.required<number>();
  noAptos = input.required<number>();

}
