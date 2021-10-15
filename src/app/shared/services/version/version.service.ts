import { CreateVersion, Version } from './../../model/Version';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { Observable } from 'rxjs';

const URL = '/version';
@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private api: ApiService) { }

  create(version: CreateVersion): Observable<CreateVersion> {
    return this.api.post(URL, version);
  }

  update(version: Version): Observable<Version> {
    return this.api.put(URL + '/' + version.id, version);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
