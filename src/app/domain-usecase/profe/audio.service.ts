import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: null,
})
export class AudioService {

  private audioPlayer: HTMLAudioElement;
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

  loadSound(sound: string, indexEA: number) {
    console.log('index EA', indexEA);
    this.audioPlayer.src = sound;
    if (indexEA === 0) {
      this.play();
    } else {
      if (this.audioPlayer.paused) { this.play() }
    }
  }

  repeatSound() {
    this.stop();
    this.play();
  }

  muteSound() {
    this.isMuted.set(!this.isMuted());
    this.audioPlayer.muted = this.isMuted();
    // this.isMuted() ? this.audioPlayer.volume = 0 : this.audioPlayer.volume = 1;
  }

  destroyAudio() {
    this.stop();
    this.audioPlayer.src = '';
    this.audioPlayer.load();
  }

  play() {
    this.audioPlayer.play();
    console.log(this.audioPlayer.paused);    
  }

  pause() {
    this.audioPlayer.pause();
    console.log(this.audioPlayer.paused);
  }

  stop() {
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
  }

}
