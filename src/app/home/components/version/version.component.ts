import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/shared/model/Project';
import { Version } from './../../../shared/model/Version';
import { ProjectService } from './../../../shared/services/project/project.service';
import { VersionService } from './../../../shared/services/version/version.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {


  versions!: Version[];
  projects!: Project[];
  projectControl = new FormControl();

  displayedColumns: string[] = ['projectId', 'id', 'active', 'number', 'date', 'gmud', 'order', 'screens', 'gerenciamento']

  dataSource!: MatTableDataSource<Version>;

  loading: boolean = false;

  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private versionService: VersionService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private router: Router ) { }

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
    },
    error => {
      this.showError("Houve um erro ao carregar Versões");
    }
    ).add(() => this.loading = false);
  }

  delete(id: number){
    this.versionService.delete(id).subscribe(() => {
      this.reloadData();
    },
    error => {
      if (error.status == 400) {
        this.showError("Não é possivel deletar uma versão com telas cadastradas");
      } else {
        this.showError("Não foi possivel deletar a versão");
      }
    })
  }

  edit(version: Version){
    this.router.navigate(['dashboard/version/add'], {state: version});
  }

  getProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects.sort((a,b) => a.name.localeCompare(b.name));
    },
    error => {
      this.showError("Houve um erro ao carregar Projetos");
    }
    );
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
    },
    error => {
      this.showError("Houve um erro ao carregar Versões");
    }).add(() => this.loading = false);
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.versions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProjectName(value: number): string {
    const project = this.projects.find((element) => element.id == value);
    return project ? project.name : '';
  }

  showError(message: string) {
    this.toastr.error(message)
  }

  showSucess() {
    this.toastr.success("Versão deletada com sucesso")
  }
}
