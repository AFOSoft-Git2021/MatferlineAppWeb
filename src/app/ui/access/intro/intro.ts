import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-intro',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro{

  public stateService = inject(StateService);
  private router = inject(Router);

  searchBuscador() {
    this.router.navigate(['buscador']);
  }

  searchProvincias() {
    this.router.navigate(['provincias']);
  }

}
