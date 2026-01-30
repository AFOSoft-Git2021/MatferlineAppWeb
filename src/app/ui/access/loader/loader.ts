import { Component, inject, OnInit } from '@angular/core';
import { State } from '../../../data/repository/state';
import { Router } from '@angular/router';
import { GetAutoescuelas } from '../../../data/repository/getAutoescuelas';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader implements OnInit {

  private stateService = inject(State);
  private getAutoescuelasService = inject(GetAutoescuelas);
  private router = inject(Router);

  ngOnInit() {
    this.getAutoescuelas();
  }

  getAutoescuelas() {
    this.stateService.loadingSpinner.set(true);
    this.getAutoescuelasService.getAutoescuelas().subscribe(
      {
        next: (response) => {
          this.stateService.loadingSpinner.set(false);
          if (Array.isArray(response)) {
            
            this.getAutoescuelasService.listaAutoescuelas.set(response);
            this.router.navigate(['intro']);

          } else {
            console.log('response', response);
          }
        },
        error: (error) => {
          console.log('error: ', error.message);
          this.stateService.loadingSpinner.set(false);
        }
      }
    )
  }

}
