import { Component, effect, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-profe-elemento-activo-video',
  imports: [],
  templateUrl: './profe-elemento-activo-video.html',
  styleUrl: './profe-elemento-activo-video.scss',
})
export class ProfeElementoActivoVideo {

  video = input.required<string>();
  // Obtenemos el contenedor usando Signals
  playerContainer = viewChild<ElementRef>('playerContainer');

  private player?: YT.Player;
  isPlayerReady = signal(false);

  constructor() {
    // Un efecto que reacciona cuando el elemento del DOM está disponible
    effect(() => {
      const container = this.playerContainer();
      if (container) {
        this.initYoutubePlayer(container.nativeElement);
      }
    });
  }

  initYoutubePlayer(element: HTMLElement) {
    // La API de YT llama a esta función global cuando está lista
    // En una app real, podrías necesitar verificar si ya existe YT.Player
    this.player = new YT.Player(element, {
      height: '100%',
      width: '100%',
      videoId: this.video(), // ID del video
      events: {
        'onReady': () => { this.isPlayerReady.set(true); this.playVideo(); },
        'onStateChange': (event) => console.log('Estado:', event.data)
      }
    });
  }

  playVideo() {
    this.player?.playVideo();
  }

  pauseVideo() {
    this.player?.pauseVideo();
  }

}
