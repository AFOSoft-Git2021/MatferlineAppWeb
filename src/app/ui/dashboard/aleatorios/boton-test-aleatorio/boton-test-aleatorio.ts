import { Component, input, output, signal } from '@angular/core';
import { BotonExamenEstudio } from "../../boton-examen-estudio/boton-examen-estudio";
import { CommonModule } from '@angular/common';
import { BotonSinAyuda } from "../../boton-sin-ayuda/boton-sin-ayuda";

@Component({
  selector: 'app-boton-test-aleatorio',
  imports: [CommonModule, BotonExamenEstudio, BotonSinAyuda],
  templateUrl: './boton-test-aleatorio.html',
  styleUrl: './boton-test-aleatorio.scss',
})
export class BotonTestAleatorio {

  tipo = input.required<number>(); //0=examen, 1=falladas
  ayuda = input.required<boolean>();
  estudio = input.required<boolean>();
  clickAyudaEmitter = output();
  onClickEmitter = output<number>();

  estudioState = signal(0);
  buttonTitle = ['Nuevo test aleatorio', 'Test de preguntas falladas'];

  onClickAyuda() {
    this.clickAyudaEmitter.emit();
  }

  onClickEstudio(event: any) {
    this.estudioState.set(parseInt(event));
  }

  onClick() {
    this.onClickEmitter.emit(this.estudioState());
  }

}
