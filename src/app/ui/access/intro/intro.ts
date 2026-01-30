import { Component, computed, inject } from '@angular/core';
import { GetAutoescuelas } from '../../../data/repository/getAutoescuelas';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro {

  private getAutoescuelasService = inject(GetAutoescuelas);
  listaAutoescuelas = computed(() => this.getAutoescuelasService.listaAutoescuelas());

}
