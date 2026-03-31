import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaService {

  // Guardamos el evento de instalación
  private deferredPrompt = signal<any>(null);

  // Signal para saber si mostramos las instrucciones
  showInstallInstructions = signal<boolean>(false);

  constructor() {
    // Escuchamos el evento 'beforeinstallprompt' para capturar el evento de instalación
    window.addEventListener('beforeinstallprompt', (event) => {
      // Evitamos que se muestre el prompt de instalación por defecto
      event.preventDefault();
      // Guardamos el evento para mostrarlo más tarde
      this.deferredPrompt.set(event);
      // Mostramos las instrucciones de instalación
      this.showInstallInstructions.set(true);
    })

    window.addEventListener('appinstalled', () => {
      // Limpiar cuando se instale con éxito
      this.deferredPrompt.set(null);
      this.showInstallInstructions.set(false);
      console.log('PWA instalada correctamente');
    })
  }

  async installPwa() {
    const prompt = this.deferredPrompt();
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        this.deferredPrompt.set(null);
      }
    }
  }

  checkIfInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true; // Para iOS
  }

}
