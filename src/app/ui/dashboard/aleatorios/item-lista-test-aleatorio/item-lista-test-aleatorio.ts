import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PopupConfirmComponent } from '../../../shared/popup-confirm/popup-confirm.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AleatorioPermisoTestTematicoCategoria } from '../../../../data/model/aleatorioPermisoTestTematicoCategoria';

@Component({
  selector: 'app-item-lista-test-aleatorio',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './item-lista-test-aleatorio.html',
  styleUrl: './item-lista-test-aleatorio.scss',
})
export class ItemListaTestAleatorio {

  private dialog = inject(MatDialog);

  categoria = input.required<AleatorioPermisoTestTematicoCategoria>();
  clickTestEmitter = output();
  showInfoTest = signal(false);

  clickTest() {
    this.clickTestEmitter.emit();
  }

  showAlertInfoTest(event: Event) {
    event.stopPropagation();
    this.showInfoTest.set(!this.showInfoTest());
    if (this.showInfoTest()) {
      this.popUpInfoTest(this.categoria().nombre, this.categoria().descripcion, 0, 0);
    }
  }

  popUpInfoTest(titulo: string, mensaje: string, modo: number, tipo: number) {

    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true, 
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo,
        mensaje,
        modo,
        tipo
      }
    });

    // al cerrar popup ...
    dialogRef.afterClosed().subscribe(
      (respuesta) => {
        if (respuesta.accion) {
          //  TODO: ???
        }
      }
    );
  }

}
