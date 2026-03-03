import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataGetProfeReproduccion } from '../model/dataGetProfeReproduccion';

@Injectable({
  providedIn: 'root',
})
export class GetReproduccionesTemaProfeService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  getReproduccionesTemaProfe(data: DataGetProfeReproduccion): Observable<HttpResponse<any>> {

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'get-reproducciones-tema-profe', formData, { observe: 'response' });
  }

}
