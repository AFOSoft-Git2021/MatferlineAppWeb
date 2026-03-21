import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { GetTemaProfeService } from '../../../data/repository/get-tema-profe.service';
import { ProfeTema } from '../../../data/model/profeTema';
import { ProfeDataGetTema } from '../../../data/model/profeDataGetTema';

@Component({
  selector: 'app-profe-container',
  imports: [],
  templateUrl: './profe-container.html',
  styleUrl: './profe-container.scss',
})
export class ProfeContainer implements OnInit, OnDestroy {

  private router = inject(Router);
  private stateService = inject(StateService);
  private getTemaProfeService = inject(GetTemaProfeService);

  temaLoaded = signal(false);
  profeDataGetTema: any;
  profeTema: ProfeTema | null = null;

  ngOnInit() {
    this.profeDataGetTema = this.stateService.profeDataGetTema() as ProfeDataGetTema;
    if (this.profeDataGetTema) {
      this.getTemaProfe();
    } else {
      this.router.navigate(['/dashboard/profeweb']);
    }
  }

  ngOnDestroy() {
    this.stateService.profeDataGetTema.set(null);
  }

  /*************************/
  /*   LLAMADAS A LA API   */
  /*************************/
  // descarga un tema
  getTemaProfe() {
    this.stateService.loadingSpinner.set(true);
    this.getTemaProfeService.getTemaProfe(this.profeDataGetTema).subscribe(
      {
        next: (response) => {
          this.stateService.loadingSpinner.set(false);

          if (response.status === 200) {
            console.log(response.body);

            if (response.body.id_curso) {

              this.profeTema = response.body;
              this.stateService.profeDataGetTema.set(null);
              this.temaLoaded.set(true);

            } else {
              console.log('response', response.body.message);
              this.router.navigate(['concurrencia', response.body.message]);
            }
          }
        },
        error: (error) => {
          this.stateService.loadingSpinner.set(false);
          console.log('error: ', error.message);
          this.router.navigate(['error']);
        }
      }
    )
  }

}
