import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GetAutoescuelasService } from '../../../data/repository/getAutoescuelas.service';
import { StateService } from '../../../data/repository/state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirstCharPipe } from "../../shared/first-char-pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provincias-list',
  imports: [CommonModule, MatIconModule, MatButtonModule, FirstCharPipe],
  templateUrl: './provincias-list.html',
  styleUrl: './provincias-list.scss',
})
export class ProvinciasList {

  public stateService = inject(StateService);
  private getAutoescuelasService = inject(GetAutoescuelasService);
  private router = inject(Router);

  listaProvincias = this.getAutoescuelasService.listaProvincias;

  selectProvincia(index: number) {
    this.router.navigate(['autoescuelas', this.listaProvincias[index]]);
  }

  gotoIntro() {
    this.router.navigate(['intro']);
  }

}
