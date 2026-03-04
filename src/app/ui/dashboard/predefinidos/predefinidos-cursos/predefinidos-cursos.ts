import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Predefinido } from '../../../../data/model/predefinido';
import { StateService } from '../../../../data/repository/state.service';
import { CommonModule } from '@angular/common';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { CabeceraCurso } from "../../cabecera-curso/cabecera-curso";
import { ItemPermisoCurso } from "../../item-permiso-curso/item-permiso-curso";
import { Router } from '@angular/router';

@Component({
  selector: 'app-predefinidos-cursos',
  imports: [CommonModule, DashboardAppBar, CabeceraCurso, ItemPermisoCurso],
  templateUrl: './predefinidos-cursos.html',
  styleUrl: './predefinidos-cursos.scss',
})
export class PredefinidosCursos implements OnInit {

  private router = inject(Router);
  private stateService = inject(StateService);
  predefinidos: Predefinido[] = [];
  showState = signal<boolean[]>([]);

  ngOnInit() {
    this.predefinidos = this.stateService.alumnoLogeado()?.predefinidos ?? [];
    this.showState.set(new Array(this.predefinidos.length).fill(true));
  }

  showPermisos(index: number) {
    this.showState()[index] = !this.showState()[index];
    console.log(this.showState()[index]);
  }

  gotoPermiso(indexCurso: number, cdiCurso: string, cdiPermiso: string) {
    console.log(`${indexCurso} / ${cdiCurso} / ${cdiPermiso}`);    
    this.router.navigate(['/dashboard/predefinidos-categorias', indexCurso, cdiCurso, cdiPermiso]);
  }

}
