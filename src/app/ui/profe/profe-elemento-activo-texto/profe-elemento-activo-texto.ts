import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profe-elemento-activo-texto',
  imports: [MatIconModule],
  templateUrl: './profe-elemento-activo-texto.html',
  styleUrl: './profe-elemento-activo-texto.scss',
})
export class ProfeElementoActivoTexto {

  cabecera = input.required<string>();
  pie = input.required<string>();
  texto = input.required<string>();

}
