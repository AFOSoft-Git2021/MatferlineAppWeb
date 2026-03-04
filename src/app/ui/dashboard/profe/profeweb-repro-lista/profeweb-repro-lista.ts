import { Component, input, signal } from '@angular/core';
import { DataProfeReproduccion } from '../../../../data/model/dataProfeReproduccion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfewebReproListaItem } from "../profeweb-repro-lista-item/profeweb-repro-lista-item";

@Component({
  selector: 'app-profeweb-repro-lista',
  imports: [CommonModule, MatIconModule, MatButtonModule, ProfewebReproListaItem],
  templateUrl: './profeweb-repro-lista.html',
  styleUrl: './profeweb-repro-lista.scss',
})
export class ProfewebReproLista {

  listaReproducciones = input.required<DataProfeReproduccion[]>();
  show = input.required<boolean>();

}
