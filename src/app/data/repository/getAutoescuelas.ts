import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Autoescuela } from '../model/autoescuela';

@Injectable({
  providedIn: 'root',
})
export class GetAutoescuelas {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  listaAutoescuelas = signal<Autoescuela[]>([]);

  getAutoescuelas(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'get-autoescuelas', { headers });
  }

}
