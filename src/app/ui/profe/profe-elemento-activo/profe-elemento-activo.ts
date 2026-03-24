import { Component, input, output } from '@angular/core';
import { ProfeTemaElemento } from '../../../data/model/ProfeTemaElemento';
import { ProfeElementoActivoVisor } from "../profe-elemento-activo-visor/profe-elemento-activo-visor";
import { ProfeElementoActivoVideo } from "../profe-elemento-activo-video/profe-elemento-activo-video";
import { ProfeElementoActivoBotones } from "../profe-elemento-activo-botones/profe-elemento-activo-botones";
import { ProfeElementoActivoNoTexto } from "../profe-elemento-activo-no-texto/profe-elemento-activo-no-texto";
import { ProfeElementoActivoTexto } from "../profe-elemento-activo-texto/profe-elemento-activo-texto";

@Component({
  selector: 'app-profe-elemento-activo',
  imports: [ProfeElementoActivoVisor, ProfeElementoActivoVideo, ProfeElementoActivoBotones, ProfeElementoActivoNoTexto, ProfeElementoActivoTexto],
  templateUrl: './profe-elemento-activo.html',
  styleUrl: './profe-elemento-activo.scss',
})
export class ProfeElementoActivo {

  elemento = input.required<ProfeTemaElemento | undefined>();
  numeroElementos = input.required<number | undefined>();
  indexEA = input.required<number>();
  clickEpigrafesEmitter = output();
  clickElementosEmitter = output();

  clickEpigrafes() {
    this.clickEpigrafesEmitter.emit();
  }

  clickElementos() {
    this.clickElementosEmitter.emit();
  }

}
