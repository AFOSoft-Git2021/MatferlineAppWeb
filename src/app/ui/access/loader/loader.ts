import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../../data/repository/state.service';
import { Router } from '@angular/router';
import { GetAutoescuelasService } from '../../../data/repository/getAutoescuelas.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from '../../shared/popup-confirm/popup-confirm.component';

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
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.stateService.clearLocalStorageStorage();
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
            this.router.navigate(['concurrencia', 'No se pudo obtener la lista de autoescuelas.']);
          }
        },
        error: (error) => {
          console.log('error: ', error.message);
          this.router.navigate(['error']);
        }
      }
    )
  }

}
