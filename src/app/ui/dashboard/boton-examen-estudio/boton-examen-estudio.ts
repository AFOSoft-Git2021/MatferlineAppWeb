import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-boton-examen-estudio',
  imports: [CommonModule],
  templateUrl: './boton-examen-estudio.html',
  styleUrl: './boton-examen-estudio.scss',
})
export class BotonExamenEstudio {

  buttonEnabled = input.required<boolean>();
  onClickEmitter = output<number>();
  selection = signal(0); // 0 = examen, 1 = estudio

  onClick(value: number) {
    console.log(value);
    
    this.selection.set(value);
    this.onClickEmitter.emit(value);
  }

}
