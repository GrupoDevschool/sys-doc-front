import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { Observable } from 'rxjs';
import { Project } from '../../model/Project';

const URL = '/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private api: ApiService) {}

  getAll(): Observable<Project[]> {
    return this.api.getAll(URL);
  }

  getById(id: number): Observable<Project> {
    return this.api.get(URL + '/' + id);
  }

  create(project: Project): Observable<Project> {
    return this.api.post(URL, project);
  }

  update(project: Project): Observable<Project> {
    return this.api.put(URL + '/' + project.id, project);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
