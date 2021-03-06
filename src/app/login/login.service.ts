import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../core/jwt/jwt.service';
import { UserData } from '../shared/model/UserData';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  type: string;
}

const URL_API: string = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }

  // Função que deve verificar se o usuário está logado
  isLoggedIn(): boolean {
    this.jwtService.getToken();

    const isAuthenticated = !this.jwtService.isTokenExpired();

    return isAuthenticated;
  }

  // Função que deve autenticar o usuário
  login(loginData: LoginData): Observable<LoginResponse> {
    loginData.password = this.encriptPassword(loginData.password);

    return this.http.post<any>(URL_API + '/auth', loginData);
  }

  setToken(token: string) {
    this.jwtService.setToken(token);
  }

  getToken(): string {
    return this.jwtService.jwtToken;
  }

  // Função que deve deslogar o usuário
  logout() {
    this.jwtService.removeToken();
    this.router.navigate(['/login']);
  }

  encriptPassword(password: string): string {
    return password;
  }

  getUserData(): UserData {
    return this.jwtService.getUserData();
  }
}
