import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  // Função que deve verificar se o usuário está logado
  isLoggedIn(): boolean {
    return true;
  }

  // Função que deve retornar o token
  getToken(): string {
    return '';
  }

  // Função que deve autenticar o usuário
  login() {

  }

  // Função que deve deslogar o usuário
  logout() {

  }

  // Função que deve verificar se o token não foi inspirado
  isExpired(): boolean {
    return false;
  }
}
