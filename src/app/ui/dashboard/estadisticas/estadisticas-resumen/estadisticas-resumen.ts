import { Component, input } from '@angular/core';
import { NumberFormatPipe } from "../../../shared/number-format.pipe";

@Component({
  selector: 'app-estadisticas-resumen',
  imports: [NumberFormatPipe],
  templateUrl: './estadisticas-resumen.html',
  styleUrl: './estadisticas-resumen.scss',
})
export class EstadisticasResumen {

  predefinidos = input.required<number>();
  aleatorios = input.required<number>();
  falladas = input.required<number>();
  acierto = input.required<string>();
  realizados = input.required<number>();

}
