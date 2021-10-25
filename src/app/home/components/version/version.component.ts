import { VersionService } from './../../../shared/services/version/version.service';
import { Version } from './../../../shared/model/Version';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/model/Project';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {


  versions!: Version[];
  projects!: Project[];
  displayedColumns: string[] = ['id', 'id do Projeto', 'active', 'number', 'date', 'gmud', 'order', 'screens', 'gerenciamento']

  dataSource!: MatTableDataSource<Version>;

  loading: boolean = false;

  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private versionService: VersionService, private router: Router ) { }

  ngAfterViewInit() {
    this.reloadData()
  }

  ngOnInit(): void {
    this.loading = true;
  }

  reloadData() {
    this.versionService.getAll().subscribe((versions) => {
      this.dataSource = new MatTableDataSource(versions)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).add(() => this.loading = false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterProject(filterValue: number) {

  }

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

}
