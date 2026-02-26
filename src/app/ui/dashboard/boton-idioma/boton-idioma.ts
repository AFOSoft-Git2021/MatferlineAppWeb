import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-boton-idioma',
  imports: [CommonModule],
  templateUrl: './boton-idioma.html',
  styleUrl: './boton-idioma.scss',
})
export class BotonIdioma implements OnInit {

  bandera = input.required<string>();
  defecto = input.required<number>();
  setIdiomaSelectedEmitter = output<number>();

  idiomaSelected = signal(0);

  ngOnInit() {
    this.idiomaSelected.set(this.defecto() ?? 0);
  }

  setIdiomaSelected(index: number) {
    this.idiomaSelected.set(index);
    this.setIdiomaSelectedEmitter.emit(index);
  }

}
