import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StateService } from '../../../data/repository/state.service';

@Component({
  selector: 'app-test-info-modo-test',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './test-info-modo-test.html',
  styleUrl: './test-info-modo-test.scss',
})
export class TestInfoModoTest {

  private stateService = inject(StateService);

  autocorreccion = input.required<boolean>();
  comenzarEmitter = output();
  abandonarEmitter = output();
  mostrarAvisoModoTestEmitter = output<boolean>();
  checked = signal(false);

  constructor() {
    effect(() => { this.stateService.showInfoModoTest = this.checked() ? '0' : '1' })
  }

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
