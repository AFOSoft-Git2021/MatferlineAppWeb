import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profe-menu-header',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-menu-header.html',
  styleUrl: './profe-menu-header.scss',
})
export class ProfeMenuHeader {

  nombreTema = input.required<string>();
  navigateBackEmitter = output();
  showInfoEmitter = output();
  goToTestEmitter = output();

  clickNavigateBack() {
    this.navigateBackEmitter.emit();
  }

  clickInfo() {
    this.showInfoEmitter.emit();
  }

  clickGoTest() {
    this.goToTestEmitter.emit();
  }

}
