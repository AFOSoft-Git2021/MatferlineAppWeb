import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../../data/repository/state.service';
import { Router } from '@angular/router';
import { GetAutoescuelasService } from '../../../data/repository/getAutoescuelas.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader implements OnInit {

  public stateService = inject(StateService);
  private getAutoescuelasService = inject(GetAutoescuelasService);
  private router = inject(Router);

  ngOnInit() {
    this.getAutoescuelas();
  }

  getAutoescuelas() {
    this.getAutoescuelasService.getAutoescuelas().subscribe(
      {
        next: (response) => {
          if (Array.isArray(response)) {

            this.getAutoescuelasService.listaAutoescuelas = response;
            this.getAutoescuelasService.getProvincias();
            this.router.navigate(['intro']);

          } else {
            console.log('response', response);
          }
        },
        error: (error) => {
          console.log('error: ', error.message);
        }
      }
    )
  }

}
