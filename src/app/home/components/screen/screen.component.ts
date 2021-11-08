import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
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

  displayedColumns: string[] = ['id', 'image', 'name', 'active', 'fatherScreenId', 'order', 'urlog', 'createdDate', 'gerenciamento'];

  dataSource!: MatTableDataSource<any>;

  loading: boolean = false;

  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectsService: ProjectService,
    private versionsService: VersionService,
    private screensService: ScreenService,
    private toastr: ToastrService,
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
    },
    error => {
      this.showError("Houve um erro ao carregar Telas");
    } ).add(() => this.loading = false);
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.screens);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProjects() {
    this.projectsService.getAll().subscribe((projects) => {
      this.projects = projects.sort((a,b) => a.name.localeCompare(b.name));
    },
    error => {
      this.showError("Houve um erro ao carregar Projetos");
    });
  }

  getVersionsByProjectId(id: number) {
    this.versions = [];

    this.versionsService.getByProjectId(id).subscribe((versions) => {
      this.versions = versions;
    },
    error => {
      this.showError("Houve um erro ao carregar Versões");
    });
  }

  getScreenByVersionId(id: number){
    this.loading = true;
    this.screens = [];
    this.setDataSource();

    this.screensService.getByVersionId(id).subscribe((screens) => {
      this.screens = screens;
      this.setDataSource();
    },
    error => {
      this.showError("Houve um erro ao carregar Telas");
    }).add(() => {this.loading = false});
  }

  getProjectName(id: number){
    const project = this.projects.find((element) => element.id == id);

    return project?.name ?? '';
  }

  getVersionNumber(id: number){
    const version = this.versions.find((element) => element.id == id);

    return version?.number ?? '';
  }

  delete(id: number){
    this.screensService.delete(id).subscribe(() => {
      this.screens = this.screens.filter((element) => element.id != id)
      this.showSucess();
      },
      error => {
        if (error.status == 400) {
          this.showError("Não é possivel deletar uma Tela com Eventos cadastrados");
        } else {
          this.showError("Não foi possivel deletar a Tela");
        }
      }
    )

    this.reloadData();
  }

  edit(screen: Screen){
    this.router.navigate(['dashboard/screen/add'], { state: screen });
  }

  showError(message: string) {
    this.toastr.error(message)
  }

  showSucess() {
    this.toastr.success("Tela deletada com sucesso")
  }
}
