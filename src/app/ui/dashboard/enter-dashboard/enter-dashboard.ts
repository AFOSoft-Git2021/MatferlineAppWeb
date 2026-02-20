import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../data/repository/state.service';
import { Usuario } from '../../../data/model/usuario';
import { LoginService } from '../../../data/repository/login.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-enter-dashboard',
  imports: [MatProgressSpinner],
  templateUrl: './enter-dashboard.html',
  styleUrl: './enter-dashboard.scss',
})
export class EnterDashboard implements OnInit {

  public stateService = inject(StateService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  
  loadData = signal(false);

  ngOnInit() {
    if (this.stateService.alumnoLogeado()) {
      this.router.navigate(['dashboard']);
    } else {
      this.loadData.set(true);
      this.relogin();    
    }
  }

  relogin() {
    const user: Usuario = {
      cdiae: '',
      usuario: '',
      clave: ''
    }
    this.loginService.login(user).subscribe(
      {
        next: (response) => {
          if (response.status === 200) {

            if (response.body.cdialumno) {

              // procesa response.body para crear el objeto alumno, tokeniza y navega a dashboard
              this.stateService.token = response.body.token;
              this.stateService.alumnoLogeado.set(response.body);
              this.router.navigate(['dashboard']);

            } else {
              console.log('response', response.body.message);
              this.router.navigate(['concurrencia', response.body.message]);
            }
          }
        },
        error: (error) => {
          console.log('error: ', error.message);
          this.router.navigate(['error']);
        }
      }
    )
  }

}
