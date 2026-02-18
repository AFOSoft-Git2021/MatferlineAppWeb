import { Component, inject } from '@angular/core';
import { StateService } from '../../../data/repository/state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-connection-error',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './connection-error.html',
  styleUrl: './connection-error.scss',
})
export class ConnectionError {

  public stateService = inject(StateService);

}
