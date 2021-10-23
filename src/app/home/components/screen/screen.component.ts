import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
export class ScreenComponent  implements OnInit, AfterViewInit {

  projects!: Project[];
  versions!: Version[];
  screens!: Screen[];
  displayedColumns: string[] = ['id', 'versionId', 'image', 'name', 'active', 'fatherScreenId', 'order', 'versionClonedId', 'gerenciamento'];

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

  ngAfterViewInit(){
    this.reloadData();
  }

  ngOnInit(){
    this.loading = true;
  }

  reloadData() {
    this.screensService.getAll().subscribe((screens) => {
      this.dataSource = new MatTableDataSource(screens)
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
