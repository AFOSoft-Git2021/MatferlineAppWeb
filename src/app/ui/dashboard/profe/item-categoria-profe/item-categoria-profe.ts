import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-categoria-profe',
  imports: [CommonModule, MatIconModule],
  templateUrl: './item-categoria-profe.html',
  styleUrl: './item-categoria-profe.scss',
})
export class ItemCategoriaProfe {

  cdi = input.required<number>();
  nombre = input.required<string>();
  icono = input.required<string>();
  numeroTemas = input.required<number>();
  show = input.required<boolean>();
  showTestEmitter = output();

  showTest() {
    this.showTestEmitter.emit();
  }

}
