import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-profe-elemento-activo-visor',
  imports: [],
  templateUrl: './profe-elemento-activo-visor.html',
  styleUrl: './profe-elemento-activo-visor.scss',
})
export class ProfeElementoActivoVisor {

  isLast = input.required<boolean>();
  elemento = input.required<string>();

  foto = signal('');

  constructor() {
    effect(() => {
      if (this.elemento()) {
        this.foto.set('');
        setTimeout(() => { this.foto.set(this.elemento()) }, 0)
      }
    })
  }

}
