import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-test-item-respuesta',
  imports: [],
  templateUrl: './test-item-respuesta.html',
  styleUrl: './test-item-respuesta.scss',
})
export class TestItemRespuesta {

  index = input.required<number>();
  seleccion = input.required<number>();
  correcta = input.required<number>();
  respuesta = input.required<string>();
  numeroRespuestas = input.required<number>();
  autocorreccion = input.required<number>();
  estadoAutoCorreccion = input.required<boolean>();
  modoCorreccion = input.required<boolean>();
  clickSeleccionEmitter = output();

  answerChar = ['A', 'B', 'C', 'D', 'E'];

  clickSeleccion() {
    this.clickSeleccionEmitter.emit();
  }

}
