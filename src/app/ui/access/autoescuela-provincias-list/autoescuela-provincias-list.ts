import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GetAutoescuelasService } from '../../../data/repository/getAutoescuelas.service';
import { StateService } from '../../../data/repository/state.service';
import { Autoescuela } from '../../../data/model/autoescuela';
import { ItemListAutoescuela } from "../item-list-autoescuela/item-list-autoescuela";

@Component({
  selector: 'app-autoescuela-provincias-list',
  imports: [CommonModule, MatIconModule, MatButtonModule, ItemListAutoescuela],
  templateUrl: './autoescuela-provincias-list.html',
  styleUrl: './autoescuela-provincias-list.scss',
})
export class AutoescuelaProvinciasList implements OnInit {

  public stateService = inject(StateService);
  private getAutoescuelasService = inject(GetAutoescuelasService);
  private router = inject(Router);

  provincia = input.required<string>();
  listaAutoescuelasProvincia = signal<Autoescuela[]>([]);

  ngOnInit() {
    this.listaAutoescuelasProvincia.set(this.getAutoescuelasService.getAutoescuelasProvincia(this.provincia()))
  }

  gotoProvincias() {
    this.router.navigate(['provincias']);
  }

  gotoLogin(autoescuela: Autoescuela) {
    this.stateService.autoescuelaSelected.set(autoescuela);
    this.router.navigate(['login']);
  }
}
