import { Injectable, signal } from '@angular/core';
import { DeviceOrientation } from '../model/deviceOrientationEnum';

@Injectable({
  providedIn: 'root',
})
export class State {

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
