import { Component, inject, input, OnInit, numberAttribute } from '@angular/core';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { CabeceraProfe } from "../cabecera-profe/cabecera-profe";
import { ProfewebProfe } from '../../../../data/model/profewebProfe';

@Component({
  selector: 'app-profeweb-categorias',
  imports: [DashboardAppBar, CabeceraProfe],
  templateUrl: './profeweb-categorias.html',
  styleUrl: './profeweb-categorias.scss',
})
export class ProfewebCategorias implements OnInit {

  private router = inject(Router);
  public stateService = inject(StateService);

  index = input.required({ transform: numberAttribute });
  profewebcdi = input.required({ transform: numberAttribute });
  profewebid = input.required<string>();
  profecdi = input.required({ transform: numberAttribute });

  profeweb: ProfewebProfe | null = null;

  ngOnInit() {
    const PROFEWEB_ARRAY = this.stateService.alumnoLogeado()?.profeweb;
    if (PROFEWEB_ARRAY) {
      for (const profeweb of PROFEWEB_ARRAY) {
        if (profeweb.cdi.toString() === this.profewebcdi().toString()) {
          for (const profe of profeweb.profes) {
            if (profe.cdi.toString() === this.profecdi().toString()) {
              this.profeweb = profe;
              break;
            }
          }
          break;
        }
      }
    }
    console.log(PROFEWEB_ARRAY);
  }

  navigateBack() {
    this.router.navigate(['/dashboard/profeweb']);
  }

}
