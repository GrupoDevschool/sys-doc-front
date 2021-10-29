import { EventType } from './../../model/EventType';
import { ApiService } from './../../../core/api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = "/eventType"

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  constructor(private api: ApiService) { }

  getAll(): Observable<EventType[]> {
    return this.api.getAll(URL);
  }

  getById(id: number): Observable<EventType> {
    return this.api.get(URL + '/' + id);
  }

  create(eventType: EventType): Observable<EventType> {
    return this.api.post(URL, eventType);
  }

  update(eventType: EventType): Observable<EventType> {
    return this.api.put(URL + '/' + eventType.id, eventType);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
