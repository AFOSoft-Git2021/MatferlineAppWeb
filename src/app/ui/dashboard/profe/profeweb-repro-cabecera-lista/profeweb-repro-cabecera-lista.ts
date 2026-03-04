import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profeweb-repro-cabecera-lista',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './profeweb-repro-cabecera-lista.html',
  styleUrl: './profeweb-repro-cabecera-lista.scss',
})
export class ProfewebReproCabeceraLista {

  iconoCategoria = input.required<string>();
  nombreCategoria = input.required<string>();
  numeroReproducciones = input.required<number>();
  showListaEmitter = output<boolean>();

  show = signal(true);

  showListaReproducciones() {
    this.show.set(!this.show());
    this.showListaEmitter.emit(this.show());
  }

}
