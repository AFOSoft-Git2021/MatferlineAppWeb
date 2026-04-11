import { Component, computed, DOCUMENT, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StateService } from '../../data/repository/state.service';
import { SpinnerLoading } from "../shared/spinner-loading/spinner-loading";
import { DeviceOrientation } from '../../data/model/deviceOrientationEnum';
import { HorizontalScreen } from "../shared/horizontal-screen/horizontal-screen";
import { ConnectionError } from "../shared/connection-error/connection-error";
import { Installation } from "../shared/installation/installation";
import { PwaService } from '../../data/repository/pwa.service';
import { DeviceSystem } from '../../data/model/deviceSystem';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerLoading, HorizontalScreen, ConnectionError, Installation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private router = inject(Router);
  private stateService = inject(StateService);
  private pwaService = inject(PwaService);
  public DeviceSystem = DeviceSystem;
  private document = inject(DOCUMENT);

  loading = computed(() => this.stateService.loadingSpinner());
  deviceOrientation = computed(() => this.stateService.deviceOrientation());
  offline = computed(() => this.stateService.offline());
  isInstalled = computed(() => this.pwaService.checkIfInstalled()); // si ya esta instalada la PWA en iOS y Android
  pwaInstallationSuccess = computed(() => this.stateService.pwaInstallationSuccess()); // para Android, si ya termino la instalacion desde el prompt

  ngOnInit() {
    if (this.checkMobile()) {

      if (this.isInstalled()) {
        this.setOrientation();
        this.router.navigate([this.checkInitialNavigationState() ? 'enter' : 'loader']);
      } else {
        this.stateService.pwaInstallationSuccess.set(false);
      }

    } else {
      location.href = 'https://matferline.com';
    }
  }

  // detecta el resize del navegador
  @HostListener('window:resize')
  onResize() {
    this.setOrientation();
  }

  // detecta la rotacion del navegador
  @HostListener('window:orientationchange')
  onOrientationChange() {
    // 1. Esperamos a que la animación de rotación termine
    setTimeout(() => {
      // 2. Truco de "sacudida" visual para WebKit
      // Cambiamos el color de fondo un ápice y lo volvemos a poner
      const originalBg = this.document.body.style.backgroundColor;
      this.document.body.style.backgroundColor = '#0E6CF2'; // un tono casi igual

      // 3. Forzamos un scroll mínimo que Safari detecta como actividad de UI
      window.scrollTo(0, 1);

      setTimeout(() => {
        this.document.body.style.backgroundColor = originalBg;
        window.scrollTo(0, 0);
      }, 50);
    }, 500); // El delay es importante en iOS
  }

  // detecta si se recupero la conexion
  @HostListener('window:online')
  onOnline() {
    console.log('online');
    this.stateService.offline.set(false);
  }

  // detecta si se perdio la conexion
  @HostListener('window:offline')
  onOffline() {
    console.log('offline');
    this.stateService.offline.set(true);
  }

  checkMobile(): boolean {

    let isMobile = false;
    const ua = navigator.userAgent;

    // --- Android ---
    if (/Android/i.test(ua)) {
      isMobile = true;
      this.stateService.deviceSystem.set(DeviceSystem.Android);
    }

    // --- iOS clásico ---
    if (/iPhone/i.test(ua) || /iPad/i.test(ua)) {
      isMobile = true;
      this.stateService.deviceSystem.set(DeviceSystem.iOS);
    }

    // --- iPadOS moderno (se anuncia como Mac) ---
    const isIPadOS = /Macintosh/i.test(ua) && 'ontouchend' in document;
    if (isIPadOS) {
      isMobile = true;
      this.stateService.deviceSystem.set(DeviceSystem.iOS);
    }

    return isMobile;
  }

  setOrientation() {
    this.stateService.deviceOrientation.set((window.innerWidth < window.innerHeight) ? DeviceOrientation.Portrait : DeviceOrientation.Landscape);
    console.log(this.stateService.deviceOrientation());
  }

  // checkea si ya hay un token para navegar directo a dashboard, sino va a loader para hacer el login
  checkInitialNavigationState(): boolean {
    return this.stateService.token ? true : false;
  }

  // instala la PWA solo si es Android
  installPWA() {
    this.pwaService.installPwa();
  }

}
