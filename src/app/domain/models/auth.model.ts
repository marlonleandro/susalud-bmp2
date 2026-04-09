export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
  username: string;
}

export interface AuthUser {
  username: string;
  token: string;
}
