import { Component, inject } from '@angular/core';
import { StateService } from '../../../data/repository/state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './server-error.html',
  styleUrl: './server-error.scss',
})
export class ServerError {
  
  public stateService = inject(StateService);
  private router = inject(Router);

  logout() {
    this.stateService.resetData();
    this.router.navigate(['inicio']);
  }

}
