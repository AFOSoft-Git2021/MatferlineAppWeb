import { Injectable, signal } from '@angular/core';
import { DeviceOrientation } from '../model/deviceOrientationEnum';
import { Autoescuela } from '../model/autoescuela';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  /**********************/
  /* VARIABLES GLOBALES */
  /**********************/

  // devuelve el anno actual
  annoDomine = new Date().getFullYear().toString();

  // duracion de los snackBar
  snackBarTime = 4000;


  /*****************/
  /**** SIGNALS ****/
  /*****************/

  // orientation de pantalla
  deviceOrientation = signal<DeviceOrientation | null>(null);

  // pantallazo cargando en cualquier pantalla de la app
  loadingSpinner = signal(false);

  // autoescuela seleccionada
  autoescuelaSelected = signal<Autoescuela | null>(null);



  /*********************************/
  /*      GESTION DEL STORAGE      */
  /*********************************/

  set token(token: string) { sessionStorage.setItem('token', token) }
  get token(): string | null { return sessionStorage.getItem('token') }

  // reset en login
  resetData() {
    this.clearStorage();
    this.loadingSpinner.set(false);
  }

  clearStorage() { sessionStorage.clear() }

}
