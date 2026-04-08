import { Component, computed, HostListener, inject } from '@angular/core';
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
    const ua = navigator.userAgent;

    // 1. Detectar iPhone (excluyendo iPads que se hacen pasar por Mac)
    const isIphone = /iPhone/i.test(ua);

    // 2. Detectar Android solo si es telefono (contiene "Mobile")
    const isAndroidPhone = /Android/i.test(ua) && /Mobile/i.test(ua);

    this.stateService.deviceSystem.set(isIphone ? DeviceSystem.iOS : DeviceSystem.Android);
    console.log('deviceSystem', this.stateService.deviceSystem());

    return isIphone || isAndroidPhone;
  }

  setOrientation() {
    this.stateService.deviceOrientation.set((window.innerWidth < window.innerHeight) ? DeviceOrientation.Portrait : DeviceOrientation.Landscape);
    console.log(this.stateService.deviceOrientation());
  }

  checkInitialNavigationState(): boolean {
    return this.stateService.token ? true : false;
  }

  // instala la PWA solo si es Android
  installPWA() {
    this.pwaService.installPwa();
  }

}
