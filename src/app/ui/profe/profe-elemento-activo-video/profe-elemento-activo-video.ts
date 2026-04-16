import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, effect, ElementRef, inject, input, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StateService } from '../../../data/repository/state.service';
import { DeviceSystem } from '../../../data/model/deviceSystem';

@Component({
  selector: 'app-profe-elemento-activo-video',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-elemento-activo-video.html',
  styleUrl: './profe-elemento-activo-video.scss',
})
export class ProfeElementoActivoVideo implements AfterViewInit, OnDestroy {

  private stateService = inject(StateService);
  public DeviceSystem = DeviceSystem;

  video = input.required<string>();
  deviceSystem = computed(() => this.stateService.deviceSystem());
  playerContainer = viewChild<ElementRef>('playerContainer');

  private player?: YT.Player;
  isPlayerReady = signal(false);
  fullscreen = signal(false);

  constructor() {
    // Efecto que reacciona SOLO al cambio de video
    effect(() => {
      const videoId = this.video();
      if (this.player && this.isPlayerReady()) {
        setTimeout(() => this.player!.loadVideoById(videoId), 100);
      }
    });
  }

  ngAfterViewInit() {
    console.log(this.video());

    const container = this.playerContainer();
    const videoId = this.video();

    if (container && !this.player) {
      this.initYoutubePlayer(container.nativeElement, videoId);
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  }

  initYoutubePlayer(element: HTMLElement, video: string) {
    this.player = new YT.Player(element, {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        playsinline: 1
      },
      videoId: video,
      events: {
        onReady: () => {
          this.isPlayerReady.set(true);
          this.playVideo();
        },
        onStateChange: (event) => console.log('Estado:', event.data)
      }
    });
  }

  playVideo() {
    this.player?.playVideo();
  }

  openYoutube() {
    window.open(`https://www.youtube.com/watch?v=${this.video()}`, '_blank');
  }

}
