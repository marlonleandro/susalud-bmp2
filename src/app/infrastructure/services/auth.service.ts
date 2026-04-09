import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthRepository } from '@domain/ports/auth.repository';
import { LoginCredentials, AuthToken } from '@domain/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authRepository = inject(AuthRepository);
  private router = inject(Router);

  login(credentials: LoginCredentials): Observable<AuthToken> {
    return this.authRepository.login(credentials);
  }

  logout(): void {
    this.authRepository.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authRepository.isAuthenticated();
  }

  getToken(): string | null {
    return this.authRepository.getToken();
  }

  getUsername(): string | null {
    return localStorage.getItem('susalud_auth_user');
  }
}
