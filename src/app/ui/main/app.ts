import { Component, computed, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { State } from '../../data/repository/state';
import { SpinnerLoading } from "../shared/spinner-loading/spinner-loading";
import { DeviceOrientation } from '../../data/model/deviceOrientationEnum';
import { HorizontalScreen } from "../shared/horizontal-screen/horizontal-screen";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerLoading, HorizontalScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private router = inject(Router);
  private stateService = inject(State);

  loading = computed(() => this.stateService.loadingSpinner());
  deviceOrientation = computed(() => this.stateService.deviceOrientation());

  ngOnInit() {
    if (this.checkMobile()) {
      this.setOrientation();

      if (!this.checkInitialNavigationState()) {
        this.router.navigate(['loader']);
      } else {
        // TODO: navegar a dashboard
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

  checkMobile(): boolean {
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
