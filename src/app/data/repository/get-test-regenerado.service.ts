import { inject, Injectable } from '@angular/core';
import { DataTestPredefinido } from '../model/dataTestPredefinidos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetTestRegeneradoService {
  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  getTestRegenerado(data: string): Observable<HttpResponse<any>> {
    console.log('getTestRegenerado', data);

    const formData = new FormData();
    formData.append('json', data);

    return this.http.post(this.url + 'get-test-regenerado', formData, { observe: 'response' });
  }
}
