import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { LoginService } from '../../../data/repository/login.service';
import { Autoescuela } from '../../../data/model/autoescuela';
import { Usuario } from '../../../data/model/usuario';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  private stateService = inject(StateService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  autoescuelaSelected = computed(() => this.stateService.autoescuelaSelected());
  usuario = 'pacosoft';
  clave = 'pacosoft';

  ngOnInit() {
    if (!this.autoescuelaSelected()) {
      this.router.navigate(['inicio']);
    }
  }

  login() {
    this.stateService.loadingSpinner.set(true);
    const user: Usuario = {
      cdiae: this.autoescuelaSelected()?.cdiae.toString() ?? '',
      usuario: this.usuario,
      clave: this.clave
    }
    this.loginService.login(user).subscribe(
      {
        next: (response) => {
          this.stateService.loadingSpinner.set(false);
          if (Array.isArray(response)) {


            // this.router.navigate(['dashboard']);

          } else {
            console.log('response', response);
          }
        },
        error: (error) => {
          console.log('error: ', error.message);
          this.stateService.loadingSpinner.set(false);
        }
      }
    )
  }
}


