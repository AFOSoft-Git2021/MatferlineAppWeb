import { inject, Injectable } from '@angular/core';
import { DataTestPredefinido } from '../model/dataTestPredefinidos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetTestPredefinidoService {
  private http = inject(HttpClient);
  private url = environment.BASE_URL;

  getTestPredefinido(data: DataTestPredefinido): Observable<HttpResponse<any>> {

    const formData = new FormData();
    formData.append('json', JSON.stringify(data));

    return this.http.post(this.url + 'get-test-predefinido', formData, { observe: 'response' });
  }
}
