import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StateService } from '../../../../data/repository/state.service';
import { PredefinidoPermisoCategoria } from '../../../../data/model/predefinidoPermisoCategoria';
import { PredefinidoPermiso } from '../../../../data/model/predefinidoPermiso';
import { DashboardAppBar } from "../../dashboard-app-bar/dashboard-app-bar";
import { ItemListaTest } from "../item-lista-test/item-lista-test";
import { CabeceraCategoria } from "../../cabecera-categoria/cabecera-categoria";
import { CabeceraPermiso } from "../../cabecera-permiso/cabecera-permiso";

@Component({
  selector: 'app-predefinidos-test',
  imports: [CommonModule, MatButtonModule, MatButtonModule, DashboardAppBar, ItemListaTest, CabeceraCategoria, CabeceraPermiso],
  templateUrl: './predefinidos-test.html',
  styleUrl: './predefinidos-test.scss',
})
export class PredefinidosTest implements OnInit {

  private router = inject(Router);
  public stateService = inject(StateService);
  
  cdicurso = input.required<string>();
  cdipermiso = input.required<string>();
  listaCategorias: PredefinidoPermisoCategoria[] = [];
  showState = signal<boolean[]>([]);

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
      this.showState.set(new Array(this.listaCategorias.length).fill(false));
    }
  }
  
  navigateBack() {
    this.router.navigate(['/dashboard/predefinidos']);
  }

  showTestCategoria(index: number) {
    this.showState()[index] = !this.showState()[index];
    console.log(this.showState());
    
  }

  getTestPredefinido(event: any) {
    console.log(event);
  }
}
