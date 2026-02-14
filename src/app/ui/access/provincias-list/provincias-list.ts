import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GetAutoescuelasService } from '../../../data/repository/getAutoescuelas.service';
import { StateService } from '../../../data/repository/state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-provincias-list',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './provincias-list.html',
  styleUrl: './provincias-list.scss',
})
export class ProvinciasList {

  public stateService = inject(StateService);
  private getAutoescuelasService = inject(GetAutoescuelasService);
  private router = inject(Router);

  listaProvincias = this.getAutoescuelasService.listaProvincias;

  selectProvincia(index: number) {}

  gotoIntro() {
    this.router.navigate(['intro']);
  }

}
