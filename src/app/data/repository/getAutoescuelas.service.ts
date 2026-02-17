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

  getAutoescuelas(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'get-autoescuelas', { headers });
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

}
