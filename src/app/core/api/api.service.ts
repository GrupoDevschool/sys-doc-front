import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';

const URL: string = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // Simple Request
  private request(path: string): Observable<any> {
    this.getHttpOptions();
    return this.http.get<any[]>(path, {headers: this.httpOptions});
  }

  // Get all Request
  getAll(path: string): Observable<any[]> {
    return this.request(this.getURL(path));
  }

  // Get Request
  get(path: string): Observable<any> {
    return this.request(this.getURL(path));
  }

  // Post Request
  post(path: string, params: any): Observable<any> {
    this.getHttpOptions();
    return this.http.post<any>(this.getURL(path), params, {headers: this.httpOptions});
  }

  // Put Request
  put(path: string, params: any): Observable<any> {
    this.getHttpOptions();
    return this.http.put<any>(this.getURL(path), params, {headers: this.httpOptions});
  }

  // Delete Request
  delete(path: string, params: any = false): Observable<any> {
    this.getHttpOptions();
    return this.http.delete<any>(this.getURL(path), {headers: this.httpOptions});
  }

  // Post with file upload
  upload(path: string, file: any): Observable<{}> {
    const formData = new FormData();

    formData.append('image', file, file.name);

    this.getHttpOptions();

    const authToken = this.loginService.getToken();

    return this.http.post<any>(this.getURL(path), formData, {headers: {
      'Authorization': 'Bearer ' + authToken,
    }});
  }

  // Function to set token in header
  private getHttpOptions() {
    const authToken = this.loginService.getToken();
    if (authToken !== '') {
      this.httpOptions = this.httpOptions.set('Authorization', 'Bearer ' + authToken);
    }
  }

  getURL(path: string): string {
    return URL + path;
  }
}
