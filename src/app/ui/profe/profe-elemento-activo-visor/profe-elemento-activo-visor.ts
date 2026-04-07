import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profe-elemento-activo-visor',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-elemento-activo-visor.html',
  styleUrl: './profe-elemento-activo-visor.scss',
})
export class ProfeElementoActivoVisor {

  isLast = input.required<boolean>();
  elemento = input.required<string>();

  foto = signal('');
  fullscreen = signal(false);

  constructor() {
    effect(() => {
      if (this.elemento()) {
        this.foto.set('');
        setTimeout(() => { this.foto.set(this.elemento()) }, 0)
      }
    })
  }

}
