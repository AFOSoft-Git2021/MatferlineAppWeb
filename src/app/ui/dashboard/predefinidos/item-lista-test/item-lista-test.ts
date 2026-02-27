import { Component, inject, input, output, signal } from '@angular/core';
import { PredefinidoPermisoCategoriaTest } from '../../../../data/model/predefinidoPermisoCategoriaTest';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PopupConfirmComponent } from '../../../shared/popup-confirm/popup-confirm.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-item-lista-test',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './item-lista-test.html',
  styleUrl: './item-lista-test.scss',
})
export class ItemListaTest {

  private dialog = inject(MatDialog);

  test = input.required<PredefinidoPermisoCategoriaTest>();
  clickTestEmitter = output();
  showInfoTest = signal(false);

  clickTest() {
    this.clickTestEmitter.emit();
  }

  showAlertInfoTest(event: Event) {
    event.stopPropagation();
    this.showInfoTest.set(!this.showInfoTest());
    if (this.showInfoTest()) {
      this.popUpInfoTest(this.test().nombre, this.test().descripcion, 0, 0);
    }
  }

  popUpInfoTest(titulo: string, mensaje: string, modo: number, tipo: number) {

    let mensajeCompleto = '';
    switch (this.test().realizado) {
      case 0: // No realizado
        mensajeCompleto = `${mensaje}<br><br><strong>Aún no has realizado este test.</strong>`;
        break;

      case 1: // Realizado pero no aprobado
        mensajeCompleto = `${mensaje}<br><br><strong>Tu último resultado de este test fue: No Apto.</strong>`;
        break;

      case 2: // Aprobado
        mensajeCompleto = `${mensaje}<br><br><strong>Tu último resultado de este test fue: Apto.</strong>`;
        break;
    }

    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true, 
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo,
        mensaje: mensajeCompleto,
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
