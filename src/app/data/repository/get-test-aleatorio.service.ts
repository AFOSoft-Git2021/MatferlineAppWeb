import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataTestAleatorio } from '../model/dataTestAleatorio';

@Injectable({
  providedIn: 'root',
})
export class GetTestAleatorioService {

  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  getTestAleatorio(data: DataTestAleatorio): Observable<HttpResponse<any>> {
    console.log('getTestAleatorio', data);

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'get-test-aleatorio', formData, { observe: 'response' });
  }

}
