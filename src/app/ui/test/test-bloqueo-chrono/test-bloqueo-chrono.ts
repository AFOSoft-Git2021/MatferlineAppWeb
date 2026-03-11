import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-test-bloqueo-chrono',
  imports: [CommonModule],
  templateUrl: './test-bloqueo-chrono.html',
  styleUrl: './test-bloqueo-chrono.scss',
})
export class TestBloqueoChrono {

  clickBloqueoEmitter = output();

  clickBloqueo() {
    this.clickBloqueoEmitter.emit();
  }

}
