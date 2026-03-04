import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CabeceraCurso } from '../../cabecera-curso/cabecera-curso';
import { DashboardAppBar } from '../../dashboard-app-bar/dashboard-app-bar';
import { ItemPermisoCurso } from '../../item-permiso-curso/item-permiso-curso';
import { Aleatorio } from '../../../../data/model/aleatorio';
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';

@Component({
  selector: 'app-aleatorios-cursos',
  imports: [CommonModule, DashboardAppBar, CabeceraCurso, ItemPermisoCurso],
  templateUrl: './aleatorios-cursos.html',
  styleUrl: './aleatorios-cursos.scss',
})
export class AleatoriosCursos implements OnInit {

  private router = inject(Router);
  private stateService = inject(StateService);
  aleatorios: Aleatorio[] = [];
  showState = signal<boolean[]>([]);

  ngOnInit() {
    this.aleatorios = this.stateService.alumnoLogeado()?.aleatorios ?? [];
    this.showState.set(new Array(this.aleatorios.length).fill(true));
  }

  showPermisos(index: number) {
    this.showState()[index] = !this.showState()[index];
  }

  gotoPermiso(indexCurso: number, cdiCurso: string, cdiPermiso: string) {
    console.log(`${indexCurso} / ${cdiCurso} / ${cdiPermiso}`);
    this.router.navigate(['/dashboard/aleatorios-test', indexCurso, cdiCurso, cdiPermiso]);
  }

}
