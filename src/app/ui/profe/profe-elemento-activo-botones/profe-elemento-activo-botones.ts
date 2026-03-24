import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profe-elemento-activo-botones',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-elemento-activo-botones.html',
  styleUrl: './profe-elemento-activo-botones.scss',
})
export class ProfeElementoActivoBotones {

  elementoIndex = input.required<number>();
  elementos = input.required<number>();
  clickEpigrafesEmitter = output();
  clickElementosEmitter = output();

  clickEpigrafes() {
    this.clickEpigrafesEmitter.emit();
  }

  clickElementos() {
    this.clickElementosEmitter.emit();
  }

}
