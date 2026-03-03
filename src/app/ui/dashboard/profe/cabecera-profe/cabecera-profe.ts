import { Component, computed, inject, input, OnInit, output, signal, numberAttribute } from '@angular/core';
import { StateService } from '../../../../data/repository/state.service';
import { CommonModule } from '@angular/common';
import { BotonIdioma } from "../../boton-idioma/boton-idioma";

@Component({
  selector: 'app-cabecera-profe',
  imports: [CommonModule, BotonIdioma],
  templateUrl: './cabecera-profe.html',
  styleUrl: './cabecera-profe.scss',
})
export class CabeceraProfe implements OnInit {

  private stateService = inject(StateService);

  index = input.required({ transform: numberAttribute });
  profewebcdi = input.required({ transform: numberAttribute });
  profecdi = input.required({ transform: numberAttribute });
  clickIdiomaEmitter = output<number>();

  nombreProfeweb = signal('');
  nombreProfe = signal('');

  idioma = computed(() => {
    return this.stateService.alumnoLogeado()?.idioma
  });
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

  iconoCabecera = computed(() => {
    return `svg/icon_profe_${this.index() + 1}.svg`;
  });

  ngOnInit() {
    const PROFEWEB_ARRAY = this.stateService.alumnoLogeado()?.profeweb;
    if (PROFEWEB_ARRAY) {
      for (const profeweb of PROFEWEB_ARRAY) {
        if (profeweb.cdi.toString() === this.profewebcdi().toString()) {
          this.nombreProfeweb.set(profeweb.nombre);
          for (const profe of profeweb.profes) {
            if (profe.cdi.toString() === this.profecdi().toString()) {
              this.nombreProfe.set(profe.nombre);
              break;
            }
          }
          break;
        }
      }
    }
  }

  clickIdioma(index: number) {
    this.idiomaSelected.set(index);
    this.clickIdiomaEmitter.emit(index);
  }

}
