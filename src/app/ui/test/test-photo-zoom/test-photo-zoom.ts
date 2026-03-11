import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-photo-zoom',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './test-photo-zoom.html',
  styleUrl: './test-photo-zoom.scss',
})
export class TestPhotoZoom {

  pregunta = input.required<number>();
  urlPhoto = input.required<string>();
  closePhotoZoomEmitter = output();

  closePhotoZoom() {
    this.closePhotoZoomEmitter.emit();
  }

}
