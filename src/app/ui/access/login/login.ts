import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { LoginService } from '../../../data/repository/login.service';
import { Usuario } from '../../../data/model/usuario';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupConfirmComponent } from '../../shared/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinner
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  public stateService = inject(StateService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  BASE_STORAGE = environment.BASE_STORAGE;
  autoescuelaSelected = computed(() => this.stateService.autoescuelaSelected());
  hide = signal(true);
  isLogin = signal(false);
  usuario = '';
  clave = '';

  ngOnInit() {
    if (!this.autoescuelaSelected()) {
      this.router.navigate(['inicio']);
    }
  }

  login() {
    const user: Usuario = {
      cdiae: this.autoescuelaSelected()?.cdiae.toString() ?? '',
      usuario: this.usuario,
      clave: this.clave
    }
    this.isLogin.set(true);
    this.loginService.login(user).subscribe(
      {
        next: (response) => {
          this.isLogin.set(false);

          if (response.status === 200) {

            if (response.body.cdialumno) {

              // procesar response.body para crear el objeto alumno y navegar a dashboard
              this.stateService.token = response.body.token;
              this.stateService.alumnoLogeado.set(response.body);
              this.router.navigate(['enter']);

            } else {
              console.log('response', response.body.message);
              this.popUpConfirm(
                'Atención',
                response.body.message ?? 'Login incorrecto. Inténtalo de nuevo.',
                1,
                0
              )
            }
          }
        },
        error: (error) => {
          this.isLogin.set(false);
          console.log('error: ', error.message);
          this.popUpConfirm(
            'Atención',
            error.message ?? 'Login incorrecto. Inténtalo de nuevo.',
            1,
            0
          )
        }
      }
    )
  }

  gotoIntro() {
    this.router.navigate(['intro']);
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
          //  TODO: ???
        }
      }
    );
  }
}


