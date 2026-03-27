import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: null,
})
export class AudioService {

  private audioPlayer: HTMLAudioElement;
  private isplaying = signal(false);
  private isMuted = signal(false);

  constructor() {
    this.audioPlayer = new Audio();
    this.audioPlayer.preload = 'auto';
    this.audioPlayer.loop = false;

    // Escuchar eventos
    this.audioPlayer.addEventListener('ended', () => {
      console.log('El audio terminó');
      this.stop();
    })
  }

  loadSound(sound: string) {
    this.audioPlayer.src = sound;
    if (!this.isplaying()) {
      this.play();
    }
  }

  managePlaying() {
    this.isplaying.set(!this.isplaying());
    this.isplaying() ? this.pause() : this.play();
  }

  repeatSound() {
    this.stop();
    this.play();
  }

  muteSound() {
    this.isMuted.set(!this.isMuted());
    this.isMuted() ? this.audioPlayer.volume = 0 : this.audioPlayer.volume = 1;
  }

  destroyAudio() {
    this.stop();
    this.audioPlayer.src = '';
    this.audioPlayer.load();
  }

  play() {
    this.audioPlayer.play();
  }

  pause() {
    this.audioPlayer.pause();
  }

  stop() {
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
  }

}
