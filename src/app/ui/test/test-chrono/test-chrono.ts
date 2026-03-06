import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-chrono',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './test-chrono.html',
  styleUrl: './test-chrono.scss',
})
export class TestChrono {

  numeroPregunta = input.required<number>();
  chronoDisplayState = input.required<string>();
  isRunning = input.required<boolean>();
  manageChronoEmitter = output();

  clickManageChrono() {
    this.manageChronoEmitter.emit();
  }

}
