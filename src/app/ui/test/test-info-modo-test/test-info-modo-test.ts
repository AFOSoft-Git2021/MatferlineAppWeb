import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-test-info-modo-test',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './test-info-modo-test.html',
  styleUrl: './test-info-modo-test.scss',
})
export class TestInfoModoTest {

  autocorreccion = input.required<boolean>();
  comenzarEmitter = output();
  abandonarEmitter = output();
  mostrarAvisoModoTestEmitter = output<boolean>();
  checked = signal(false);

  comenzar() {
    this.comenzarEmitter.emit();
  }

  abandonar() {
    this.abandonarEmitter.emit();
  }

  mostrarAvisoModoTest() {
    this.mostrarAvisoModoTestEmitter.emit(this.checked());
  }

}
