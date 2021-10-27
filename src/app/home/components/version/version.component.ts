import { ProjectService } from './../../../shared/services/project/project.service';
import { VersionService } from './../../../shared/services/version/version.service';
import { Version } from './../../../shared/model/Version';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/model/Project';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {


  versions!: Version[];
  projects!: Project[];
  filteredProjects!: Observable<Project[]>;
  projectControl = new FormControl();

  displayedColumns: string[] = ['projectId', 'id', 'active', 'number', 'date', 'gmud', 'order', 'screens', 'gerenciamento']

  dataSource!: MatTableDataSource<Version>;

  loading: boolean = false;

  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private versionService: VersionService, private projectService: ProjectService, private router: Router ) { }

  ngAfterViewInit() {
    this.reloadData()
  }

  ngOnInit(): void {
    this.loading = true;

  }

  reloadData() {
    this.getProjects()

    this.versionService.getAll().subscribe((versions) => {
      this.versions = versions;
      this.setDataSource();
    }).add(() => this.loading = false);
  }

  /*applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterIdProjeto(filterValue: string) {

    this.dataSource.filterPredicate = (data: Version, filter: string) => {
      filter = filterValue;
      return data.projectId.toString() == filter;
    };

  }*/

  delete(id: number){
    this.versionService.delete(id).subscribe(() => {
      this.versions = this.versions.filter((element) => element.id != id)
      }
    )
    this.reloadData();
  }

  edit(version: Version){
    this.router.navigate(['dashboard/version/add'], {state: version});
  }

  getProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;

      this.filteredProjects = this.projectControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          return this.filterProject(value)
        })
      );
    });
  }

  filterProject(value: string): Project[] {
    const filterValue = value.toLowerCase();

    this.versions = [];

    return this.projects.filter(project => project.name.toLowerCase().includes(filterValue));
  }

  filterVersionProjectId(value: any){
    this.getVersionByProject(value);
  }

  getVersionByProject(id: number){
    this.loading = true;
    this.versions = [];
    this.setDataSource();

    this.versionService.getByProjectId(id).subscribe((versions) => {
      this.versions = versions;
      this.setDataSource();
    }).add(() => this.loading = false);
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.versions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
