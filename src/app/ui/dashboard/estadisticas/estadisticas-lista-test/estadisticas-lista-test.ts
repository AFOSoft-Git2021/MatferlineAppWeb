import { Component, input, output, signal } from '@angular/core';
import { CabeceraEstadisticasTest } from "../cabecera-estadisticas-test/cabecera-estadisticas-test";
import { EstadisticasPermisoTest } from '../../../../data/model/estadisticasPermisoTest';
import { CommonModule } from '@angular/common';
import { ItemListaTest } from "../../predefinidos/item-lista-test/item-lista-test";
import { EstadisticasListaTestItemTest } from "../estadisticas-lista-test-item-test/estadisticas-lista-test-item-test";

@Component({
  selector: 'app-estadisticas-lista-test',
  imports: [CommonModule, CabeceraEstadisticasTest, ItemListaTest, EstadisticasListaTestItemTest],
  templateUrl: './estadisticas-lista-test.html',
  styleUrl: './estadisticas-lista-test.scss',
})
export class EstadisticasListaTest {

  idcurso = input.required<string>();
  listaTest = input.required<EstadisticasPermisoTest[]>();
  testSeleccionadoEmitter = output<{ cditest: string, tipo: string }>();

  showState = signal(true);

  showListaTest() {
    this.showState.set(!this.showState());
  }

  testSeleccionado(cditest: string, tipo: string) {
    this.testSeleccionadoEmitter.emit({ cditest, tipo });
  }

}
