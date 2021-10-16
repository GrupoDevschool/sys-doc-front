import { ApiService } from './../../../core/api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createScreen } from '../../model/Screen';

const URL = "/screen";
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private api: ApiService) { }

  getAll(): Observable<Screen[]> {
    return this.api.getAll(URL);
  }

  getById(id: number): Observable<Screen> {
    return this.api.get(URL + '/' + id);
  }

  create(screen: createScreen): Observable<createScreen> {
    return this.api.post(URL, screen);
  }

  update(screen: createScreen): Observable<createScreen> {
    return this.api.put(URL + '/' + screen.id, screen);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }

}
