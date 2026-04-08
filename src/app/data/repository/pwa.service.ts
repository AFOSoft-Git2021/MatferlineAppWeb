import { inject, Injectable, signal } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class PwaService {

  // Guardamos el evento de instalación
  private deferredPrompt = signal<any>(null);
  private stateService = inject(StateService);

  constructor() {
    /****************************/
    /* SOLO FUNCIONA EN ANDROID */
    /****************************/

    // Escuchamos el evento 'beforeinstallprompt' para capturar el evento de instalación
    window.addEventListener('beforeinstallprompt', (event) => {
      // Evitamos que se muestre el prompt de instalación por defecto
      event.preventDefault();
      // Guardamos el evento para mostrarlo más tarde
      this.deferredPrompt.set(event);
      // Mostramos las instrucciones de instalación
    })

    window.addEventListener('appinstalled', () => {
      this.stateService.pwaInstallationSuccess.set(true); // Actualizamos el estado de instalación
      // Limpiar cuando se instale con éxito
      this.deferredPrompt.set(null);
      console.log('PWA instalada correctamente');
    })
  }

  async installPwa() {
    console.log('installPwa');

    const prompt = this.deferredPrompt();
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        this.deferredPrompt.set(null);
      }
      console.log('Outcome:', outcome);
    }
  }

  checkIfInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true; // Para iOS
  }

}
