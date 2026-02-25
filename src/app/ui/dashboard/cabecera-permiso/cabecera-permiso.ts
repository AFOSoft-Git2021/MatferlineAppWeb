import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { Idioma } from '../../../data/model/idioma';
import { CommonModule } from '@angular/common';
import { StateService } from '../../../data/repository/state.service';

@Component({
  selector: 'app-cabecera-permiso',
  imports: [CommonModule],
  templateUrl: './cabecera-permiso.html',
  styleUrl: './cabecera-permiso.scss',
})
export class CabeceraPermiso implements OnInit {

  private stateService = inject(StateService);

  cdicurso = input.required<string>();
  nombrecurso = input.required<string>();
  cdipermiso = input.required<string>();
  nombrepermiso = input.required<string>();
  icono = input.required<string>();
  idioma = input.required<Idioma | null>();

  clickIdiomaEmitter = output<number>();
  clickEstadisticasEmitter = output();

  idiomaSelected = signal(0);
  idiomaExists = computed(() => {
    const nombre = this.idioma()?.nombre;
    return nombre ? nombre.length > 0 : false;
  })

  indexColor = computed(() => {
    if (parseInt(this.cdicurso()) > this.stateService.colorList.length) {
      return Math.floor(Math.random() * this.stateService.colorList.length);
    } else {
      return parseInt(this.cdicurso()) - 1;
    }
  })
  colorSet = computed(() => {
    return this.stateService.colorList[this.indexColor()];
  })

  ngOnInit() { }

}
