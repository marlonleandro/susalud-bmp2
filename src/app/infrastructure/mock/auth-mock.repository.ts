import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthRepository } from '@domain/ports/auth.repository';
import { LoginCredentials, AuthToken } from '@domain/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthMockRepository extends AuthRepository {
  private readonly VALID_USERNAME = 'admin';
  private readonly VALID_PASSWORD = 'admin123';
  private readonly TOKEN_KEY = 'susalud_auth_token';
  private readonly USER_KEY = 'susalud_auth_user';

  login(credentials: LoginCredentials): Observable<AuthToken> {
    // Simular delay de red
    return of(credentials).pipe(
      delay(800),
      switchMap(creds => {
        if (creds.username === this.VALID_USERNAME && creds.password === this.VALID_PASSWORD) {
          const token: AuthToken = {
            token: this.generateMockToken(),
            expiresIn: 3600, // 1 hora
            username: creds.username
          };
          
          // Guardar en localStorage
          localStorage.setItem(this.TOKEN_KEY, token.token);
          localStorage.setItem(this.USER_KEY, token.username);
          
          return of(token);
        } else {
          return throwError(() => new Error('Credenciales inválidas'));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private generateMockToken(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return `mock_token_${timestamp}_${random}`;
  }
}
