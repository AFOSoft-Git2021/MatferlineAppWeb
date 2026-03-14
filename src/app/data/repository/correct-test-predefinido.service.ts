import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataCorreccionTestPredefinido } from '../model/dataCorreccionTestPredefinido';

@Injectable({
  providedIn: 'root',
})
export class CorrectTestPredefinidoService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  correctTestPredefinido(data: DataCorreccionTestPredefinido): Observable<HttpResponse<any>> {
    console.log('correctTestPredefinido', data);

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'correct-test-predefinido', formData, { observe: 'response' });
  }

}
