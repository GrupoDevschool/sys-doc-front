import { Event } from './../../model/Event';
import { ApiService } from './../../../core/api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = "/event"

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private api: ApiService) { }

  getAll(): Observable<Event[]> {
    return this.api.getAll(URL);
  }

  getById(id: number): Observable<Event> {
    return this.api.get(URL + '/' + id);
  }

  getByScreenId(screenId: number): Observable<Event[]> {
    return this.api.get(URL + 'screenId=' + screenId);
  }

  create(event: Event): Observable<Event> {
    return this.api.post(URL, event);
  }

  update(event: Event): Observable<Event> {
    return this.api.put(URL + '/' + event.id, event);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
