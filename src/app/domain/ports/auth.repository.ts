import { Observable } from 'rxjs';
import { LoginCredentials, AuthToken } from '../models/auth.model';

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Observable<AuthToken>;
  abstract logout(): void;
  abstract getToken(): string | null;
  abstract isAuthenticated(): boolean;
}
