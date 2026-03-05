import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PopupConfirmComponent } from '../../shared/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-test-menu-header',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './test-menu-header.html',
  styleUrl: './test-menu-header.scss',
})
export class TestMenuHeader {

  private dialog = inject(MatDialog);

  curso = input.required<string>();
  permiso = input.required<string>();
  categoria = input.required<string>();
  test = input.required<string>();
  descripcion = input.required<string>();
  chronoTimeOutState = input<boolean>();
  navigateBackEmitter = output();

  infoTestState = signal(false);

  setInfoTestState(event: Event) {
    event.stopPropagation();
    this.infoTestState.set(!this.infoTestState());
    if (this.infoTestState()) { this.popUpInfoTest() }
  }

  popUpInfoTest() {

    let mensajeCompleto = `
    Curso:${this.curso()}<br>
    Permiso: ${this.permiso()}<br>
    Categoría: ${this.categoria()}<br>
    Descripción: ${this.descripcion()}`;

    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo: this.test(),
        mensaje: mensajeCompleto,
        modo: 0,
        tipo: 0
      }
    });

    // al cerrar popup ...
    dialogRef.afterClosed().subscribe(
      (respuesta) => {
        if (respuesta.accion) {
          this.infoTestState.set(false);
        }
      }
    );
  }



  navigateBack() {
    this.navigateBackEmitter.emit();
  }

}
