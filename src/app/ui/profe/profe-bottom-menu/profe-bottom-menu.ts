import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profe-bottom-menu',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './profe-bottom-menu.html',
  styleUrl: './profe-bottom-menu.scss',
})
export class ProfeBottomMenu {

  clickAtrasEmitter = output();
  clickAlanteEmitter = output();
  clickPausaEmitter = output();
  clickRepetirEmitter = output();
  clickSonidoEmitter = output();

  playingState = signal(true);
  soundMuted = signal(false);

  clickAtras() {
    this.clickAtrasEmitter.emit();
  }

  clickAlante() {
    this.clickAlanteEmitter.emit();
  }

  clickPausa() {
    this.playingState.set(!this.playingState());
    this.clickPausaEmitter.emit();
  }

  clickRepetir() {
    this.clickRepetirEmitter.emit();
  }

  clickSonido() {
    this.soundMuted.set(!this.soundMuted());
    this.clickSonidoEmitter.emit();
  }

}
