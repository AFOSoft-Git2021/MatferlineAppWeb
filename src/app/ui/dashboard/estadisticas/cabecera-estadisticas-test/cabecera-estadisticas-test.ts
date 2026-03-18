import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cabecera-estadisticas-test',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cabecera-estadisticas-test.html',
  styleUrl: './cabecera-estadisticas-test.scss',
})
export class CabeceraEstadisticasTest {

  numeroTest = input.required<number>();
  show = input.required<boolean>();
  showTestEmitter = output();

  showTest() {
    this.showTestEmitter.emit();
  }

}
