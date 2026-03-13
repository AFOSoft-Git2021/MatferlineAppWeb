import { Component, input, output } from '@angular/core';
import { TipoTest } from '../../../data/model/tipoTestEnum';
import { DataResponseCorregirTest } from '../../../data/model/dataResponseCorregirTest';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test-resultado',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './test-resultado.html',
  styleUrl: './test-resultado.scss',
})
export class TestResultado {

  public TipoTest = TipoTest;

  tipoTestSeleccionado = input.required<TipoTest>();
  numeroPreguntas = input.required<number>();
  resultado = input.required<DataResponseCorregirTest | null>();
  clickTerminarEmitter = output();
  clickRevisarEmitter = output();

  clickTerminar() {
    this.clickTerminarEmitter.emit();
  }

  clickRevisar() {
    this.clickRevisarEmitter.emit();
  }

}
