import { Version } from './../../model/Version';
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

  getAll(versionId: number): Observable<Screen[]> {
    return this.api.getAll(URL + '/' + versionId);
  }

  getById(id: number): Observable<Screen> {
    return this.api.get(URL + '/' + id);
  }

  create(version: createScreen): Observable<createScreen> {
    return this.api.post(URL, version);
  }

  update(version: createScreen): Observable<createScreen> {
    return this.api.put(URL + '/' + version.id, version);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }

}
