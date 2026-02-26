import { Component, output } from '@angular/core';

@Component({
  selector: 'app-boton-sin-ayuda',
  imports: [],
  templateUrl: './boton-sin-ayuda.html',
  styleUrl: './boton-sin-ayuda.scss',
})
export class BotonSinAyuda {

  onClickEmitter = output();

  onClick() {
    this.onClickEmitter.emit();
  }

}
