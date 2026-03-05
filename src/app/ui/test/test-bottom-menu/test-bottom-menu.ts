import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-bottom-menu',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './test-bottom-menu.html',
  styleUrl: './test-bottom-menu.scss',
})
export class TestBottomMenu {

  clickOptionEmitter = output<number>();

  clickOption(option: number) {
    this.clickOptionEmitter.emit(option);
  }

}
