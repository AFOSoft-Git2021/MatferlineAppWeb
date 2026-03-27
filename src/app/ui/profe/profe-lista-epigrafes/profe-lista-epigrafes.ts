import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profe-lista-epigrafes',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-lista-epigrafes.html',
  styleUrl: './profe-lista-epigrafes.scss',
})
export class ProfeListaEpigrafes {

  nombreTema = input.required<string>();
  listaDeEpigrafes = input.required<[number, string][]>();
  closeListaEpigrafesEmitter = output();
  clickGoToEpigrafeEmitter = output<number>();

  closeListaEpigrafes() {
    this.closeListaEpigrafesEmitter.emit();
  }

  clickGoToEpigrafe(index: number) {
    console.log('clickGoToEpigrafe', index);
    
    this.clickGoToEpigrafeEmitter.emit(index);
  }

}
