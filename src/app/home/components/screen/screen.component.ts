import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Project } from 'src/app/shared/model/Project';
import { Screen } from 'src/app/shared/model/Screen';
import { Version } from 'src/app/shared/model/Version';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent  implements OnInit {
  projects!: Project[];
  filteredProjects!: Observable<Project[]>;
  projectControl = new FormControl();

  versions!: Version[];

  screens!: Screen[];

  displayedColumns: string[] = ['id', 'image', 'name', 'active', 'screenFatherId', 'order', 'gerenciamento'];

  dataSource!: MatTableDataSource<any>;

  loading: boolean = false;

  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectsService: ProjectService,
    private versionsService: VersionService,
    private screensService: ScreenService,
    private router: Router ) {
  }

  ngOnInit(){
    this.loading = true;

    this.reloadData();
  }

  reloadData() {
    this.getProjects();

    this.screensService.getAll().subscribe((screens) => {
      this.screens = screens;
      this.setDataSource();
    }).add(() => this.loading = false);
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.screens);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProjects() {
    this.projectsService.getAll().subscribe((projects) => {
      this.projects = projects;

      this.filteredProjects = this.projectControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          this.filterVersions(value);
          return this.filterProject(value)
        })
      );
    });
  }

  getVersions(id: number) {
    this.versionsService.getByProjectId(id).subscribe((versions) => {
      this.versions = versions;
    });
  }

  getScreenByVersion(id: number){
    this.loading = true;
    this.screens = [];
    this.setDataSource();

    this.screensService.getByVersionId(id).subscribe((screens) => {
      this.screens = screens;
      this.setDataSource();
    }).add(() => this.loading = false);
  }

  filterProject(value: string): Project[] {
    const filterValue = value.toLowerCase();

    this.versions = [];

    return this.projects.filter(project => project.name.toLowerCase().includes(filterValue));
  }

  filterVersions(projectName: string) {
    const selectedProject = this.projects.find(project => project.name === projectName);

    if(selectedProject?.id) {
      this.getVersions(selectedProject.id);
    }
  }

  filterScreen(value: any){
    this.getScreenByVersion(value);
  }

  delete(id: number){
    this.screensService.delete(id).subscribe(() => {
      this.screens = this.screens.filter((element) => element.id != id)
      }
    )

    this.reloadData();
  }

  edit(screen: Screen){
    this.router.navigate(['dashboard/screen/add'], { state: screen });
  }
}
