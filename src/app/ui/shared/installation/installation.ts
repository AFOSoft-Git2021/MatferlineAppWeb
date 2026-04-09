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

  gotoPlayStore() {
    window.open('https://play.google.com/store/apps/details?id=com.afosoft.matferlineappandroid&pcampaignid=web_share', '_blank');
  }

  installPWA() {
    this.installPWAEmitter.emit();
  }

  checkIfSafari(): boolean {
    const ua = navigator.userAgent;
    const platform = navigator.platform;

    // Detecta Safari (excluye Chrome, Firefox, Edge en iOS)
    const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);

    // Detecta iPhone clásico
    const isIphone = /iPhone/.test(ua);

    // Detecta iPad moderno (se identifica como Mac pero con soporte táctil)
    const isIpadModern = platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    return isSafari && (isIphone || isIpadModern);
  }

}
