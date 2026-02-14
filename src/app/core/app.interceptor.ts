import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from '../data/repository/state.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {

  const stateService = inject(StateService);
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
