import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-permiso-curso',
  imports: [CommonModule, MatIconModule],
  templateUrl: './item-permiso-curso.html',
  styleUrl: './item-permiso-curso.scss',
})
export class ItemPermisoCurso {

  cdi = input.required<string>();
  nombre = input.required<string>();
  icono = input.required<string>();
  numeroCategorias = input.required<number>();
  clickPermisoEmitter = output<string>();

  clickPermiso() {
    this.clickPermisoEmitter.emit(this.cdi());
  }

}
