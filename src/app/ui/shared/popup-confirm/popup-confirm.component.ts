import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-popup-confirm',
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent implements OnInit {

  titulo: string;
  mensaje: string;
  modo: number; // 0->info; 1->error
  tipo: number; // 0->alert; 1->confirm

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupConfirmComponent>
  ) {
    this.titulo = this.data.titulo;
    this.mensaje = this.data.mensaje;
    this.modo = this.data.modo;
    this.tipo = this.data.tipo;
  }

  ngOnInit() { }

  // cierra el pop-up devolviendo true o false
  public cerrarPopUp(accionBoton: boolean) {
    this.dialogRef.close({
      accion: accionBoton
    })
  }

}

