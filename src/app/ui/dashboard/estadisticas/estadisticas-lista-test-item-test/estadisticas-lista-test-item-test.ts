import { Component, inject, input, output, signal } from '@angular/core';
import { EstadisticasPermisoTest } from '../../../../data/model/estadisticasPermisoTest';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PopupConfirmComponent } from '../../../shared/popup-confirm/popup-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-estadisticas-lista-test-item-test',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './estadisticas-lista-test-item-test.html',
  styleUrl: './estadisticas-lista-test-item-test.scss',
})
export class EstadisticasListaTestItemTest {

  private dialog = inject(MatDialog);

  idcurso = input.required<string>();
  test = input.required<EstadisticasPermisoTest>();
  clickTestEmitter = output();

  showInfoTest = signal(false);

  clickTest() {
    this.clickTestEmitter.emit();
  }

  showAlertInfoTest(event: Event) {
    event.stopPropagation();
    this.showInfoTest.set(!this.showInfoTest());
    if (this.showInfoTest()) {
      this.popUpInfoTest(this.test(), 0, 0);
    }
  }

  popUpInfoTest(test: EstadisticasPermisoTest, modo: number, tipo: number) {

    const PUNTUACION = (this.idcurso() === "CAP") ? `Puntos: ${test.puntuacion}` : `Fallos: ${test.puntuacion}`;
    const REVISION = (this.test().solo_revision === 0) ? 'No' : 'Sí';

    let mensajeCompleto = `
    Nombre: ${test.nombre}<br>
    Fecha: ${test.fecha}<br>
    Hora: ${test.hora}<br>
    Apto: ${test.apto}<br>
    ${PUNTUACION}<br>
    Tipo: ${test.tipo}<br>
    Solo revisión: ${REVISION}<br>`;

    if (this.test().idioma.length > 0) { mensajeCompleto += `Idioma: ${test.idioma}<br>` }
    // if (this.test().bandera.length > 0) { mensajeCompleto += `Bandera: ${test.bandera}<br>` }

    const dialogRef = this.dialog.open(PopupConfirmComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '80vh',
      data: {
        titulo: 'Estadísticas. Test realizado',
        mensaje: mensajeCompleto,
        modo,
        tipo
      }
    });

    // al cerrar popup ...
    dialogRef.afterClosed().subscribe(
      (respuesta) => {
        if (respuesta.accion) {
          this.showInfoTest.set(false);
        }
      }
    )
  }

}
