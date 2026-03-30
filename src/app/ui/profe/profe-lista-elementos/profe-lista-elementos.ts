import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, input, output, viewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profe-lista-elementos',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-lista-elementos.html',
  styleUrl: './profe-lista-elementos.scss',
})
export class ProfeListaElementos implements AfterViewChecked {

  // Obtenemos todos los elementos que tengan la referencia #item
  listItems = viewChildren<ElementRef>('listItem');

  indexEA = input.required<number>();
  nombreTema = input.required<string>();
  listaElementos = input.required<[string, string][]>();
  closeListaElementosEmitter = output();
  clickGoToElementoEmitter = output<number>();

  ngAfterViewChecked() {
    this.scrollToIndex(this.indexEA());
  }

  scrollToIndex(index: number) {
    const elementArray = this.listItems();

    if (elementArray[index]) {
      elementArray[index].nativeElement.scrollIntoView({
        behavior: 'smooth', // Animación suave
        block: 'nearest',   // Lo alinea al borde más cercano
        inline: 'start'
      });
    }
  }

  closeListaElementos() {
    this.closeListaElementosEmitter.emit();
  }

  clickGoToElemento(index: number) {
    this.clickGoToElementoEmitter.emit(index);
  }

}
