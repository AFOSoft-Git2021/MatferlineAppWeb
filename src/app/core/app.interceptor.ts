import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { State } from '../data/repository/state';

export const appInterceptor: HttpInterceptorFn = (req, next) => {

  const stateService = inject(State);
  const TOKEN = stateService.token;

  if (TOKEN) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${TOKEN ?? ''}`
      }
    });
    console.log('http interceptado:', clonedRequest.headers);
    return next(clonedRequest);

  } else {
    console.log('http no interceptado');
    return next(req);
  }

}
