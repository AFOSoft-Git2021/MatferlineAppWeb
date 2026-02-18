import { Injectable, signal } from '@angular/core'
import { DeviceOrientation } from '../model/deviceOrientationEnum'
import { Autoescuela } from '../model/autoescuela'
import { Alumno } from '../model/alumno'

@Injectable({
  providedIn: 'root',
})
export class StateService {

  /**********************/
  /* VARIABLES GLOBALES */
  /**********************/

  // devuelve el anno actual
  annoDomine = new Date().getFullYear().toString()

  // duracion de los snackBar
  snackBarTime = 4000



  /*****************/
  /**** SIGNALS ****/
  /*****************/

  // orientation de pantalla
  deviceOrientation = signal<DeviceOrientation | null>(null)

  // pantallazo cargando en cualquier pantalla de la app
  loadingSpinner = signal(false)

  // pantallazo offline
  offline = signal(false)

  // autoescuela seleccionada
  autoescuelaSelected = signal<Autoescuela | null>(null)

  // alumno logeado
  alumnoLogeado = signal<Alumno | null>(null)



  /*********************************/
  /*      GESTION DEL STORAGE      */
  /*********************************/

  set token(token: string) { localStorage.setItem('token', token) }
  get token(): string | null { return localStorage.getItem('token') }

  // reset en login
  resetData() {
    this.clearLocalStorageStorage()
    this.loadingSpinner.set(false)
  }

  clearLocalStorageStorage() { localStorage.clear() }
  clearSessionStorageStorage() { sessionStorage.clear() }



  /********************************/
  /*      GESTION DE COLORES      */
  /********************************/
  BlueSuperDark = '#00419e';
  BlueDark = '#0e6cf3';
  BlueMedium = '#3283f8';
  BlueLight = '#62a2ff';
  BlueSuperLight = '#abd5fd';
  ButtonMagenta = '#a90094';
  OrangeDark = '#ff8a00';
  OrangeLight = '#fbcb93';
  PurpleDark = '#5932f8';
  PurpleLight = '#bd69ff';
  GrayText = '#707070';

  BackgroundLetterA = '#298c83';
  BackgroundLetterB = '#e892a4';
  BackgroundLetterC = '#e7bb53';
  BackgroundLetterD = '#8dc8ff';
  BackgroundLetterE = '#ce85fe';
  BackgroundLetterF = '#5751f5';
  BackgroundLetterG = '#009688';
  BackgroundLetterH = '#ff80ab';
  BackgroundLetterI = '#c51162';
  BackgroundLetterJ = '#ff6d00';
  BackgroundLetterK = '#b2ff59';
  BackgroundLetterL = '#40c4ff';
  BackgroundLetterM = '#7c4dff';
  BackgroundLetterN = '#c2b11f';
  BackgroundLetterNH = '#ff3d00';
  BackgroundLetterO = '#26a69a';
  BackgroundLetterP = '#ffca28';
  BackgroundLetterQ = '#40c4ff';
  BackgroundLetterR = '#ff6e40';
  BackgroundLetterS = '#33b93d';
  BackgroundLetterT = '#364fe7';
  BackgroundLetterU = '#9b9665';
  BackgroundLetterV = '#f50057';
  BackgroundLetterW = '#5694b0';
  BackgroundLetterX = '#bf360c';
  BackgroundLetterY = '#304ffe';
  BackgroundLetterZ = '#e040fb';

  BackgroundCurso1_1 = '#660012';
  BackgroundCurso1_2 = '#b36674';
  BackgroundCurso1_3 = '#ff7f94';
  BackgroundCurso1_4 = '#ffccd5';
  BackgroundCurso2_1 = '#2a593e';
  BackgroundCurso2_2 = '#77ad8d';
  BackgroundCurso2_3 = '#6fbd88';
  BackgroundCurso2_4 = '#c3ffdc';
  BackgroundCurso3_1 = '#0086a8';
  BackgroundCurso3_2 = '#46a6fa';
  BackgroundCurso3_3 = '#45b2d3';
  BackgroundCurso3_4 = '#7bdbec';
  BackgroundCurso4_1 = '#3c4f00';
  BackgroundCurso4_2 = '#739f00';
  BackgroundCurso4_3 = '#d1ff55';
  BackgroundCurso4_4 = '#c6e783';
  BackgroundCurso5_1 = '#7c016c';
  BackgroundCurso5_2 = '#b900a1';
  BackgroundCurso5_3 = '#ff6ee6';
  BackgroundCurso5_4 = '#fc7de8';

}
