import { Component, computed, inject, input, output, signal } from '@angular/core';
import { Idioma } from '../../../data/model/idioma';
import { CommonModule } from '@angular/common';
import { StateService } from '../../../data/repository/state.service';
import { BotonIdioma } from "../boton-idioma/boton-idioma";

@Component({
  selector: 'app-cabecera-permiso',
  imports: [CommonModule, BotonIdioma],
  templateUrl: './cabecera-permiso.html',
  styleUrl: './cabecera-permiso.scss',
})
export class CabeceraPermiso {

  private stateService = inject(StateService);

  cdicurso = input.required<string>();
  nombrecurso = input.required<string>();
  cdipermiso = input.required<string>();
  nombrepermiso = input.required<string>();
  icono = input.required<string>();
  idioma = input.required<Idioma | null>();
  index = input.required<number>();

  clickIdiomaEmitter = output<number>();
  clickEstadisticasEmitter = output();

  idiomaSelected = signal(0);
  idiomaExists = computed(() => {
    const nombre = this.idioma()?.nombre;
    return nombre ? nombre.length > 0 : false;
  });

  indexColor = computed(() => {
    if (this.index() > this.stateService.colorList.length) {
      return Math.floor(Math.random() * this.stateService.colorList.length);
    } else {
      return this.index();
    }
  });
  colorSet = computed(() => {
    return this.stateService.colorList[this.indexColor()];
  });

  clickIdioma(index: number) {
    console.log('clickIdioma:', index);
    
    this.idiomaSelected.set(index);
    this.clickIdiomaEmitter.emit(index);
  }

  clickEstadisticas() {
    this.clickEstadisticasEmitter.emit();
  }



}
