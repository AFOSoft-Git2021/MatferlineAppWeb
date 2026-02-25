import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cabecera-categoria',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cabecera-categoria.html',
  styleUrl: './cabecera-categoria.scss',
})
export class CabeceraCategoria {

  nombreCategoria = input.required<string>();
  numeroTest = input.required<number>();
  propia = input.required<number>();
  show = input.required<boolean>();
  showTestEmitter = output();

  showTest() {
    this.showTestEmitter.emit();
  }

}
