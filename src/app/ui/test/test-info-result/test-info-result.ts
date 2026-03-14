import { Component, input } from '@angular/core';
import { TipoTest } from '../../../data/model/tipoTestEnum';
import { DataResponseCorregirTestDatosCorreccion } from '../../../data/model/dataResponseCorregirTestDatosCorreccion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-info-result',
  imports: [CommonModule, MatIconModule],
  templateUrl: './test-info-result.html',
  styleUrl: './test-info-result.scss',
})
export class TestInfoResult {

  public TipoTest = TipoTest;

  tipoTest = input.required<TipoTest>();
  numeroPregunta = input.required<number>();
  resultado = input.required<DataResponseCorregirTestDatosCorreccion | null>();


}
