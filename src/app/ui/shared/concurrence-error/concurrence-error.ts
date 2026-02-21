import { Component, inject, input } from '@angular/core';
import { StateService } from '../../../data/repository/state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concurrence-error',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './concurrence-error.html',
  styleUrl: './concurrence-error.scss',
})
export class ConcurrenceError {

  public stateService = inject(StateService);
  private router = inject(Router);

  mensaje = input.required<string>();

  logout() {
    this.stateService.resetData();
    this.router.navigate(['inicio']);
  }

}
