import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-app-bar',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard-app-bar.html',
  styleUrl: './dashboard-app-bar.scss',
})
export class DashboardAppBar {

  titulo = input.required<string>();
  nivel = input.required<number>();
  goBackEmitter = output();

  goBack() {
    this.goBackEmitter.emit();
  }

}
