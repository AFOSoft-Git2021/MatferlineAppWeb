import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateService } from '../data/repository/state.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const stateService = inject(StateService);
  const token = stateService.token;

  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
}
