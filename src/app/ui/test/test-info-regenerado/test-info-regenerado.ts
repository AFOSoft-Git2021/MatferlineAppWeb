import { Component, input, output } from '@angular/core';
import { TipoTest } from '../../../data/model/tipoTestEnum';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test-info-regenerado',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './test-info-regenerado.html',
  styleUrl: './test-info-regenerado.scss',
})
export class TestInfoRegenerado {

  public TipoTest = TipoTest;

  tipoTest = input.required<TipoTest>();
  comenzarEmitter = output();
  revisarEmitter = output();
  abandonarEmitter = output();

  comenzar() {
    this.comenzarEmitter.emit();
  }

  revisar() {
    this.revisarEmitter.emit();
  }

  abandonar() {
    this.abandonarEmitter.emit();
  }

}
