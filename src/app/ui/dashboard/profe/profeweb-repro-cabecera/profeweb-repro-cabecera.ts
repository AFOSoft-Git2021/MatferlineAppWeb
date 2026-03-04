import { Component, computed, inject, input } from '@angular/core';
import { StateService } from '../../../../data/repository/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profeweb-repro-cabecera',
  imports: [CommonModule],
  templateUrl: './profeweb-repro-cabecera.html',
  styleUrl: './profeweb-repro-cabecera.scss',
})
export class ProfewebReproCabecera {

  nombreProfe = input.required<string>();
  nombreProfeweb = input.required<string>();
  indexCurso = input.required<number>();
  index = input.required<number>();

  private stateService = inject(StateService);

  indexColor = computed(() => {
    if (this.indexCurso() > this.stateService.colorList.length) {
      return Math.floor(Math.random() * this.stateService.colorList.length);
    } else {
      return this.indexCurso();
    }
  });

  colorSet = computed(() => {
    return this.stateService.colorList[this.indexColor()];
  });

  iconoCabecera = computed(() => {
    return `svg/icon_profe_${this.index() + 1}.svg`;
  });


}
