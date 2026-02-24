import { Component, computed, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StateService } from '../../data/repository/state.service';
import { SpinnerLoading } from "../shared/spinner-loading/spinner-loading";
import { DeviceOrientation } from '../../data/model/deviceOrientationEnum';
import { HorizontalScreen } from "../shared/horizontal-screen/horizontal-screen";
import { ConnectionError } from "../shared/connection-error/connection-error";
import { ServerError } from "../shared/server-error/server-error";
import { ConcurrenceError } from "../shared/concurrence-error/concurrence-error";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerLoading, HorizontalScreen, ConcurrenceError, ServerError, ConnectionError],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private router = inject(Router);
  private stateService = inject(StateService);

  loading = computed(() => this.stateService.loadingSpinner());
  deviceOrientation = computed(() => this.stateService.deviceOrientation());
  offline = computed(() => this.stateService.offline());

  ngOnInit() {
    if (this.checkMobile()) {

      this.setOrientation();
      this.router.navigate([this.checkInitialNavigationState() ? 'enter' : 'loader']);
      
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
    alert('online');
  }

  // detecta si se perdio la conexion
  @HostListener('window:offline')
  onOffline() {
    alert('offline');
  }

  checkMobile(): boolean {
    // TODO: mejorar esta función para eliminar los tablets
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  setOrientation() {
    this.stateService.deviceOrientation.set((window.innerWidth < window.innerHeight) ? DeviceOrientation.Portrait : DeviceOrientation.Landscape);
    console.log(this.stateService.deviceOrientation());
  }

  checkInitialNavigationState(): boolean {
    return this.stateService.token ? true : false;
  }

}
