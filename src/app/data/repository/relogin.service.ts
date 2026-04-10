import { inject, Injectable } from '@angular/core';
import { StateService } from './state.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloginService {

  private stateService = inject(StateService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  async relogin(): Promise<boolean> {
    const user: Usuario = { cdiae: '', usuario: '', clave: '' };

    try {
      const response = await firstValueFrom(this.loginService.login(user));

      if (response.status === 200) {
        console.log('Promise', response.body);

        if (response.body.cdialumno) {

          this.stateService.token = response.body.token; // retokeniza el jwt
          this.stateService.alumnoLogeado.set(response.body); // refresca el alumno logeado en el stateService
          return true;

        } else {
          this.router.navigate(['concurrencia', response.body.message]);
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error('error: ', error);
      this.router.navigate(['error']);
      return false;
    }
  }

}
