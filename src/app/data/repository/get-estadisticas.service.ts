import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataGetEstadisticas } from '../model/dataGetEstadisticas';

@Injectable({
  providedIn: 'root',
})
export class GetEstadisticasService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  getEstadisticas(data: DataGetEstadisticas): Observable<HttpResponse<any>> {
    console.log('getEstadisticas', data);

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'get-estadisticas', formData, { observe: 'response' });
  }
  
}
