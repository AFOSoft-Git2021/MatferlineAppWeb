import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StateService } from '../../../data/repository/state.service';

@Component({
  selector: 'app-installation',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './installation.html',
  styleUrl: './installation.scss',
})
export class Installation {

  public stateService = inject(StateService);
  deviceSystem = computed(() => this.stateService.deviceSystem());

  pwaInstallationSuccess = input.required<boolean>();
  installPWAEmitter = output();

  installPWA() {
    this.installPWAEmitter.emit();
  }

}
