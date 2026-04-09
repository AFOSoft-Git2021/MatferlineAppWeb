import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DeviceSystem } from '../../../data/model/deviceSystem';
import { StateService } from '../../../data/repository/state.service';

@Component({
  selector: 'app-profe-elemento-activo-visor',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-elemento-activo-visor.html',
  styleUrl: './profe-elemento-activo-visor.scss',
})
export class ProfeElementoActivoVisor {

  private stateService = inject(StateService);
  public DeviceSystem = DeviceSystem;

  isLast = input.required<boolean>();
  elemento = input.required<string>();
  deviceSystem = computed(() => this.stateService.deviceSystem());

  foto = signal('');
  fullscreen = signal(false);

  constructor() {
    effect(() => {
      if (this.elemento()) {
        this.foto.set('');
        setTimeout(() => { this.foto.set(this.elemento()) }, 0)
      }
    })
  }

}
