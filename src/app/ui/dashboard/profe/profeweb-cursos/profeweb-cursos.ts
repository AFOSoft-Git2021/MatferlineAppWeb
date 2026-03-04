import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { Profeweb } from '../../../../data/model/profeweb';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { CabeceraCurso } from '../../cabecera-curso/cabecera-curso';
import { ItemProfewebProfe } from "../item-profeweb-profe/item-profeweb-profe";


@Component({
  selector: 'app-profeweb-cursos',
  imports: [DashboardAppBar, CabeceraCurso, ItemProfewebProfe],
  templateUrl: './profeweb-cursos.html',
  styleUrl: './profeweb-cursos.scss',
})
export class ProfewebCursos implements OnInit {

  private router = inject(Router);
  private stateService = inject(StateService);
  profewebList: Profeweb[] = [];
  showState = signal<boolean[]>([]);

  ngOnInit() {
    this.profewebList = this.stateService.alumnoLogeado()?.profeweb ?? [];
    this.showState.set(new Array(this.profewebList.length).fill(true));
  }

  showPermisos(index: number) {
    this.showState()[index] = !this.showState()[index];
    console.log(this.showState()[index]);
  }

  gotoProfeweb(indexCurso: number, index: number, profewebcdi: number, profewebid: string, profecdi: number) {
    this.router.navigate(['/dashboard/profeweb-categorias', indexCurso, index, profewebcdi, profewebid, profecdi]);
  }

}
