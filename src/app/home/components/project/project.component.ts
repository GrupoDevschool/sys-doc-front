import { ProjectService } from './../../../shared/services/project/project.service';
import { Project } from './../../../shared/model/Project';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSource: MatTableDataSource<Project>;
  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectsService: ProjectService ) {

  }

  ngAfterViewInit() {
    this.projectsService.getAll().subscribe((projects) => {
      this.dataSource = new MatTableDataSource(projects)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



