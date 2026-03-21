import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProfeDataGetTema } from '../model/profeDataGetTema';

@Injectable({
  providedIn: 'root',
})
export class GetTemaProfeService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  getTemaProfe(data: ProfeDataGetTema): Observable<HttpResponse<any>> {
    console.log('getTemaProfe', data);

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'get-tema-profe', formData, { observe: 'response' });
  }

}
