import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { PredefinidoPermisoCategoria } from '../../../../data/model/predefinidoPermisoCategoria';
import { PredefinidoPermiso } from '../../../../data/model/predefinidoPermiso';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";

@Component({
  selector: 'app-predefinidos-test',
  imports: [CommonModule, MatButtonModule, MatButtonModule, DashboardAppBar],
  templateUrl: './predefinidos-test.html',
  styleUrl: './predefinidos-test.scss',
})
export class PredefinidosTest implements OnInit {

  private router = inject(Router);
  private stateService = inject(StateService);

  cdicurso = input.required<string>();
  cdipermiso = input.required<string>();
  listaCategorias: PredefinidoPermisoCategoria[] = [];

  nombreCurso = '';
  permiso: PredefinidoPermiso | null = null;

  ngOnInit() {
    const PREDEFINIDOS = this.stateService.alumnoLogeado()?.predefinidos;
    if (PREDEFINIDOS) {
      for (const predefinido of PREDEFINIDOS) {
        if (predefinido.cdi.toString() === this.cdicurso()) {
          this.nombreCurso = predefinido.nombre;
          for (const permiso of predefinido.permisos) {
            if (permiso.cdi.toString() === this.cdipermiso()) {
              this.permiso = permiso;
              this.listaCategorias = permiso.categorias;
              break;
            }
          }
          break;
        }
      }
    }
  }
  
  navigateBack() {
    this.router.navigate(['/dashboard/predefinidos']);
  }
}
