import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-test-item-respuesta',
  imports: [CommonModule],
  templateUrl: './test-item-respuesta.html',
  styleUrl: './test-item-respuesta.scss',
})
export class TestItemRespuesta {

  index = input.required<number>();
  seleccion = input.required<number>();
  correcta = input.required<number>();
  respuesta = input.required<string>();
  autocorreccion = input.required<number>();
  estadoAutoCorreccion = input.required<boolean>();
  modoCorreccion = input.required<boolean>();
  clickSeleccionEmitter = output();

  answerChar = ['A', 'B', 'C', 'D', 'E'];

  clickSeleccion() {
    console.log(`correcta: ${this.correcta()} / seleccion: ${this.seleccion()}`);
    
    this.clickSeleccionEmitter.emit();
  }

}
