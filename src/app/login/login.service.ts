import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../core/jwt/jwt.service';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const URL_API: string = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }

  // Função que deve verificar se o usuário está logado
  isLoggedIn(): boolean {
    this.jwtService.getToken();

    const isAuthenticated = !this.jwtService.isTokenExpired();

    this.setIsAuthenticated(isAuthenticated);

    return isAuthenticated;
  }

  // Função que deve autenticar o usuário
  login(loginData: LoginData): Observable<LoginResponse> {
    loginData.password = this.encriptPassword(loginData.password);

    return this.http.get<any>(URL_API + '/login');
    // return this.http.post<any>(URL_API + '/login', loginData);
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
    this.setIsAuthenticated(false);
    this.router.navigate(['/login']);
  }

  encriptPassword(password: string): string {
    return password;
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  setIsAuthenticated(isAuthenticated: boolean) {
    this.isLogged.next(isAuthenticated);
  }
}
