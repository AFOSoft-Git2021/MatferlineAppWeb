import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PopupConfirmComponent } from '../../../shared/popup-confirm/popup-confirm.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfewebProfeCategoriaTema } from '../../../../data/model/profewebProfeCategoriaTema';

@Component({
  selector: 'app-item-lista-profe-tema',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './item-lista-profe-tema.html',
  styleUrl: './item-lista-profe-tema.scss',
})
export class ItemListaTest {

  private dialog = inject(MatDialog);

  tema = input.required<ProfewebProfeCategoriaTema>();
  clickTemaEmitter = output();
  showInfoTema = signal(false);

  clickTema() {
    this.clickTemaEmitter.emit();
  }

  showAlertTema(event: Event) {
    event.stopPropagation();
    this.showInfoTema.set(!this.showInfoTema());
    if (this.showInfoTema()) {
      this.popUpInfoTema(this.tema().titulo, this.tema().descripcion, 0, 0);
    }
  }

  popUpInfoTema(titulo: string, mensaje: string, modo: number, tipo: number) {

    let mensajeCompleto = `
    ${mensaje}<br><br>
    Test del tema:<br>
    ${this.tema().nombre_test}<br>
    ${this.tema().descripcion_test}
    `;

    if (this.tema().reproducido === 1) {
      mensajeCompleto += `<br><br><strong>Ya has estudiado este tema con anterioridad.</strong>`
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
