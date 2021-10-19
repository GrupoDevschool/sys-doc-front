import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { CreateProject } from 'src/app/shared/model/Project';
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

  create(project: CreateProject): Observable<Project> {
    return this.api.post(URL, project);
  }

  update(project: CreateProject): Observable<Project> {
    return this.api.put(URL + '/' + project.id, project);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(URL + '/' + id);
  }
}
