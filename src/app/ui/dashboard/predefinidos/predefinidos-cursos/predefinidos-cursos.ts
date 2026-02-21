import { Component, inject, input, OnInit } from '@angular/core';
import { Predefinido } from '../../../../data/model/predefinido';
import { StateService } from '../../../../data/repository/state.service';
import { CommonModule } from '@angular/common';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";

@Component({
  selector: 'app-predefinidos-cursos',
  imports: [CommonModule, DashboardAppBar],
  templateUrl: './predefinidos-cursos.html',
  styleUrl: './predefinidos-cursos.scss',
})
export class PredefinidosCursos implements OnInit {

  private stateService = inject(StateService);
  predefinidos: Predefinido[] = [];


  ngOnInit() {
    this.predefinidos = this.stateService.alumnoLogeado()?.predefinidos ?? [];
    console.log(this.stateService.alumnoLogeado()?.predefinidos);
  }

}
