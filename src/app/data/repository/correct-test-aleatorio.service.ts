import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataCorreccionTestAleatorio } from '../model/dataCorreccionTestAleatorio';

@Injectable({
  providedIn: 'root',
})
export class CorrectTestAleatorioService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  correctTestAleatorio(data: DataCorreccionTestAleatorio): Observable<HttpResponse<any>> {
    console.log('correctTestPredefinido', data);

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'correct-test-aleatorio', formData, { observe: 'response' });
  }

}
