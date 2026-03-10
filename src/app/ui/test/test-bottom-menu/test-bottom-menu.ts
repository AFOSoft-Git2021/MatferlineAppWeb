import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-bottom-menu',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './test-bottom-menu.html',
  styleUrl: './test-bottom-menu.scss',
})
export class TestBottomMenu {

  private matSnackbar = inject(MatSnackBar)

  ayuda = input.required<number>();
  autocorreccion = input.required<number>();
  modoCorreccion = input.required<boolean>();
  clickOptionEmitter = output<number>();

  showInfoSnackbar(mensaje: string) {
    this.matSnackbar.open(mensaje, 'Ok', {
      duration: 4000
    })
  }

  clickOption(option: number) {
    if (option === 1) {
      if (this.ayuda() === 0 && !this.modoCorreccion()) {
        this.showInfoSnackbar('Tienes desactivada la ayuda en este test. Consulta a tu autoescuela');
        return;
      }
    }
    this.clickOptionEmitter.emit(option);
  }

}
