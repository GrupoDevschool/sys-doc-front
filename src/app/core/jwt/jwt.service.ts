import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserData } from 'src/app/shared/model/UserData';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwtToken: string = '';
  decodedToken: { [key: string]: string } = {};
  loginDate: string = '';

  constructor() { }

  hasToken(): boolean {
    return this.jwtToken !== '';
  }

  // called on login
  setToken(token: string | null) {
    if (token) {
      this.jwtToken = token;
      this.decodeToken();
      this.decodedToken.iat ? new Date(Number(this.decodedToken.iat) * 1000) : '';
      this.loginDate = new Date().toISOString();
      this.setInStorage('sysdocjwt', token);
    }
  }

  // called on guard route to get the token
  getToken() {
    if (!this.hasToken()) {
      const token = this.getInStorage('sysdocjwt');
      this.jwtToken = token ? token : '';
      this.decodeToken();
      this.decodedToken.iat ? new Date(Number(this.decodedToken.iat) * 1000) : '';
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
    } else {
      this.decodedToken = {};
    }
  }

  removeToken() {
    this.jwtToken = '';
    this.decodedToken = {};
    this.removeInStorage('sysdocjwt');
  }

  getUserId(): Number | null {
    return this.decodedToken ? Number(this.decodedToken.sub) : null;
  }

  getUserName(): string | null {
    return this.decodedToken ? this.decodedToken.nome : null;
  }

  getEmail(): string | null {
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime(): string | null {
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  getLoginDate(): string {
    return this.decodedToken ? new Date(Number(this.decodedToken.iat) * 1000).toISOString() : 'null';
  }

  // called on guard to check if token is expired
  isTokenExpired(): boolean {
    const time = this.getExpiryTime();
    // convert miliseconds to seconds
    const expiryTime = time ? new Date(Number(time)*1000) : null;

    if (expiryTime) {
      return new Date() > expiryTime;
    } else {
      this.removeToken();
      return true;
    }
  }

  getUserData(): UserData {
    return {
      name: this.getUserName(),
      loginDate: this.getLoginDate(),
    };
  }

  // Set item in LocalStorage
  setInStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // Get item in LocalStorage
  getInStorage(key: string) {
    return localStorage.getItem(key);
  }

  // Remove a item in LocalStorage
  removeInStorage(key: string) {
    localStorage.removeItem(key);
  }
}
