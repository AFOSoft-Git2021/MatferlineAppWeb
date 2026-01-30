import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { State } from '../data/repository/state';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const stateService = inject(State);
  const token = stateService.token;

  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
}
