import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from './../../../shared/model/Project';
import { ProjectService } from './../../../shared/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {

  filtroProjeto = '';

  projects!: Project[];

  displayedColumns: string[] = ['id', 'name', 'active', 'gerenciamento'];

  dataSource!: MatTableDataSource<Project>;

  loading: boolean = false;

  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectsService: ProjectService,
    private toastr: ToastrService,
    private router: Router ) {

  }

  ngAfterViewInit(){
    this.reloadData();
  }

  ngOnInit(){
    this.loading = true;
  }

  reloadData() {
    this.projectsService.getAll().subscribe((projects) => {
      this.dataSource = new MatTableDataSource(projects)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      this.showError("Houve um erro ao carregar Projetos");
    }).add(() => this.loading = false);

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number){
    this.projectsService.delete(id).subscribe(() => {
      this.showSucess();
      this.reloadData();
    },
    error => {
      if (error.status == 400) {
        this.showError("Não é possivel deletar um projeto com versões cadastradas");
      } else {
        this.showError("Não foi possivel deletar o projeto");
      }
    })
  }

  edit(project: Project){
    this.router.navigate(['dashboard/project/add'], { state: project });
  }

  showError(message: string) {
    this.toastr.error(message)
  }

  showSucess() {
    this.toastr.success("Projeto deletado com sucesso")
  }
}



