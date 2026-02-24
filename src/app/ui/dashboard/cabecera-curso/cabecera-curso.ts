import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StateService } from '../../../data/repository/state.service';

@Component({
  selector: 'app-cabecera-curso',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cabecera-curso.html',
  styleUrl: './cabecera-curso.scss',
})
export class CabeceraCurso implements OnInit {

  public stateService = inject(StateService);

  index = input.required<number>();
  curso = input.required<string>();
  show = input.required<boolean>();
  showPermisosEmitter = output();

  ngOnInit() { }

  showPermisos() {
    this.showPermisosEmitter.emit();
  }

}
