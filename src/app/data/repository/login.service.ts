import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  login(usuario: Usuario): Observable<HttpResponse<any>> {
    return this.http.post(this.url + 'login', usuario, { observe: 'response' });
  }
  
}
