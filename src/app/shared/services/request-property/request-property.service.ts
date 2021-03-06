import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestProperty } from '../../model/RequestProperty';
import { ApiService } from './../../../core/api/api.service';

const URL = '/requestProperty';

@Injectable({
  providedIn: 'root',
})
export class RequestPropertyService {
  constructor(private api: ApiService) {}

  getAll(): Observable<RequestProperty[]> {
    return this.api.getAll(URL);
  }

  getAllByRequestId(requestId: number): Observable<RequestProperty[]> {
    return this.api.get(URL + '?requestId=' + requestId);
  }

  getById(id: number): Observable<RequestProperty> {
    return this.api.get(URL + '/' + id);
  }

  create(requestProperty: RequestProperty): Observable<RequestProperty> {
    return this.api.post(URL, requestProperty);
  }

  update(requestProperty: RequestProperty): Observable<RequestProperty> {
    return this.api.put(
      URL + '/' + requestProperty.id,
      requestProperty
    );
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
