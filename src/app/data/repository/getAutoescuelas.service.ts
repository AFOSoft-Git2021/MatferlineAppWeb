import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Autoescuela } from '../model/autoescuela';

@Injectable({
  providedIn: 'root',
})
export class GetAutoescuelasService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  listaAutoescuelas: Autoescuela[] = [];
  listaProvincias: string[] = [];
  TITULOS_AES = [
    'Autoescuelas',
    'Autoescuela',
    'Autoeskolak',
    'Autoeskola',
    'Autoescola',
    'Centro de formación vial',
    'Centro de formación',
    'Grupo de formación',
    'Auto-Escuela',
    'Auto Escuela',
    'Autoescoles',
    'Centros de formación vial',
    'Centros de formación',
    'Centros de',
    'Centre de formació en seguretat viària',
    'Escuela de conductores',
    'Escola de conductors',
    'Escola de Conducció',
    'Formación Integral',
    'Formación vial',
    'Formación',
    'Formació'
  ]

  getAutoescuelas(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'get-autoescuelas', { headers });
  }

  limpiarNombreAEs(autoescuelas: Autoescuela[]) {
    this.listaAutoescuelas = autoescuelas.map(autoescuela => {
      let limpio = autoescuela.nombre;
      this.TITULOS_AES.forEach(titulo => {
        const regex = new RegExp(titulo, 'gi'); // 'gi' → global + case-insensitive
        limpio = limpio.replace(regex, '').trim().replace(/\s{2,}/g, ' '); // elimina espacios dobles
      });
      autoescuela.nombre = limpio || autoescuela.nombre; // Si queda vacío, mantenemos el original
      return autoescuela;
    });
  }

  getProvincias() {
    this.listaProvincias = [
      ...new Set(this.listaAutoescuelas.map(autoescuela => autoescuela.provincia.trim()))
    ].sort((a, b) => a.localeCompare(b))
  }

  getAutoescuelasProvincia(provincia: string): Autoescuela[] {
    return this.listaAutoescuelas
      .filter(autoescuela => autoescuela.provincia.trim() === provincia)
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  getAutoescuelasBuscador(buscador: string): Autoescuela[] {
    return this.listaAutoescuelas
      .filter(autoescuela => autoescuela.nombre.toLowerCase().trim().includes(buscador.toLowerCase().trim()))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

}
