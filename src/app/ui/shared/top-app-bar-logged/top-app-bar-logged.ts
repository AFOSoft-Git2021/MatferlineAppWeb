import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Alumno } from '../../../data/model/alumno';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from '../popup-confirm/popup-confirm.component';
import { StateService } from '../../../data/repository/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-app-bar-logged',
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './top-app-bar-logged.html',
  styleUrl: './top-app-bar-logged.scss',
})
export class TopAppBarLogged implements OnInit {

  private stateService = inject(StateService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  
  alumno = input<Alumno | null>(null);
  fotoAlumno = signal('');

  ngOnInit() {
    // this.fotoAlumno.set('svg/icon_avatar.svg');
    this.fotoAlumno.set(this.alumno()?.foto ?? 'svg/icon_avatar.svg');
  }

  // abre popup de confirm
  popUpConfirm(titulo: string, mensaje: string, modo: number, tipo: number) {
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
          this.stateService.resetData();
          this.router.navigate(['login']);
        }
      }
    );
  }
  
  logout() {
    this.popUpConfirm(
      'Vas a cerrar sesión',
      'Tendrás que volver a logearte. ¿Deseas continuar?',
      1,
      1
    )
  }

}
