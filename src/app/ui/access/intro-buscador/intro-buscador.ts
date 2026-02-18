import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetAutoescuelasService } from '../../../data/repository/getAutoescuelas.service';
import { Autoescuela } from '../../../data/model/autoescuela';
import { ItemListAutoescuela } from "../item-list-autoescuela/item-list-autoescuela";

@Component({
  selector: 'app-intro-buscador',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, ItemListAutoescuela],
  templateUrl: './intro-buscador.html',
  styleUrl: './intro-buscador.scss',
})
export class IntroBuscador {

  public stateService = inject(StateService);
  private getAutoescuelasService = inject(GetAutoescuelasService);
  private router = inject(Router);

  txtSearch = '';
  listaAutoescuelas = signal<Autoescuela[]>([]);

  buscarAES() {
    if (this.txtSearch.length > 2) {
      this.listaAutoescuelas().length = 0;
      this.listaAutoescuelas.set(this.getAutoescuelasService.getAutoescuelasBuscador(this.txtSearch));
    }
  }

  goBack() {
    this.router.navigate(['intro']);
  }

  gotoLogin(autoescuela: Autoescuela) {
    this.stateService.autoescuelaSelected.set(autoescuela);
    this.router.navigate(['login']);
  }

}
