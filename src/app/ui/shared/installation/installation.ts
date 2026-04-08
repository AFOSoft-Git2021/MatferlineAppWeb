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
  isSafari = computed(() => this.checkIfSafari());

  installPWA() {
    this.installPWAEmitter.emit();
  }

  checkIfSafari(): boolean {
    const isSafariOnIPhone = () => {
      const ua = window.navigator.userAgent;
      const isIPhone = /iPhone/i.test(ua);
      const isWebKit = /WebKit/i.test(ua);
      const isChrome = /CriOS/i.test(ua); // Chrome en iOS usa "CriOS"
      const isFirefox = /FxiOS/i.test(ua); // Firefox en iOS usa "FxiOS"

      return isIPhone && isWebKit && !isChrome && !isFirefox;
    }
    return isSafariOnIPhone();
  }

}
