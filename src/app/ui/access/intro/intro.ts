import { Component, computed, inject, OnInit } from '@angular/core';
import { GetAutoescuelasService } from '../../../data/repository/getAutoescuelas.service';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { Autoescuela } from '../../../data/model/autoescuela';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-intro',
  imports: [MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro implements OnInit {

  public stateService = inject(StateService);
  private getAutoescuelasService = inject(GetAutoescuelasService);
  private router = inject(Router);

  listaAutoescuelas = this.getAutoescuelasService.listaAutoescuelas;

  ngOnInit() {
    if (this.listaAutoescuelas.length === 0) {
      this.router.navigate(['loader']);
    }
  }

  selectAutoescuela(autoescuela: Autoescuela) {
    this.stateService.autoescuelaSelected.set(autoescuela);
    this.router.navigate(['login']);
  }

  searchProvincias() {
    this.router.navigate(['provincias']);
  }

}
