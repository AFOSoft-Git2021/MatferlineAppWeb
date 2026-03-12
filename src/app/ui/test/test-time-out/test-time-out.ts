import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-time-out',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './test-time-out.html',
  styleUrl: './test-time-out.scss',
})
export class TestTimeOut {

  corregirTestEmitter = output();

  corregirTest() {
    this.corregirTestEmitter.emit();
  }

}
