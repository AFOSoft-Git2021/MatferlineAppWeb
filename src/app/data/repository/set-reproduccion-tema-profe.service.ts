import { inject, Injectable } from '@angular/core';
import { DataSetReproduccionTemaProfe } from '../model/dataSetReproduccionTemaProfe';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SetReproduccionTemaProfeService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  setReproduccionTemaProfe(data: DataSetReproduccionTemaProfe): Observable<HttpResponse<any>> {
    console.log('getTemaProfe', data);

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'set-reproduccion-tema-profe', formData, { observe: 'response' });
  }

}
