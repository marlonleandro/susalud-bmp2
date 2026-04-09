import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthRepository } from '@domain/ports/auth.repository';

export const authGuard: CanActivateFn = (route, state) => {
  const authRepository = inject(AuthRepository);
  const router = inject(Router);

  if (authRepository.isAuthenticated()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
