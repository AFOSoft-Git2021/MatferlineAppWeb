import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profeweb-repro-lista-item',
  imports: [],
  templateUrl: './profeweb-repro-lista-item.html',
  styleUrl: './profeweb-repro-lista-item.scss',
})
export class ProfewebReproListaItem {

  titulo = input.required<string>();
  fecha = input.required<string>();
  hora = input.required<string>();

}
