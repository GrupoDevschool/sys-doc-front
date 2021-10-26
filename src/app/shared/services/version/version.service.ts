import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { CreateVersion, Version } from './../../model/Version';

const URL = '/version';
@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private api: ApiService) { }

  getAll(): Observable<Version[]>{
    return this.api.get(URL);
  }

  getById(id: number): Observable<Version> {
    return this.api.get(URL + '/' + id);
  }

  getByProjectId(id: number): Observable<Version[]> {
    return this.api.get(URL + '?projectId=' + id);
  }

  create(version: CreateVersion): Observable<CreateVersion> {
    return this.api.post(URL, version);
  }

  update(version: CreateVersion): Observable<CreateVersion> {
    return this.api.put(URL + '/' + version.id, version);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
