import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../../data/repository/state.service';

@Component({
  selector: 'app-installation',
  imports: [],
  templateUrl: './installation.html',
  styleUrl: './installation.scss',
})
export class Installation implements OnInit {

  public stateService = inject(StateService);

  ngOnInit() {
    // TODO: pasar desde app si esta en iOS o Android para personalizar la info de la pantalla de instalacion
  }

}
