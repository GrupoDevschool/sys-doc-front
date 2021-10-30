import { ApiService } from './../../../core/api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../../model/Request';

const URL = '/request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Request[]> {
    return this.api.getAll(URL);
  }

  getAllbyEventId(eventId: number): Observable<Request[]> {
    return this.api.get(URL + '?eventId=' + eventId);
  }

  getById(id: number): Observable<Request> {
    return this.api.get(URL + '/' + id);
  }

  create(request: Request): Observable<Request> {
    return this.api.post(URL, request);
  }

  update(request: Request): Observable<Request> {
    return this.api.put(URL + '/' + request.id, request);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
