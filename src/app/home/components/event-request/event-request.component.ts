import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/shared/model/Request';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { EventService } from './../../../shared/services/event/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.scss']
})
export class EventRequestComponent implements OnInit {
  dataSource!: MatTableDataSource<Request>;

  displayedColumns: string[] = ['id', 'eventId', 'description' ,'uri_homolog', 'uri_prod', 'layer', 'status', 'order','actions'];

  selection = new SelectionModel<string>(true, []);

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectService: ProjectService,
    private versionService: VersionService,
    private screenService: ScreenService,
    private eventService: EventService,
    private requestService: RequestService,
    private router: Router
    ) {

    }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.loading = true;
    this.requestService.getAll().subscribe(
      (data: Request[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
    ).add(() => this.loading = false);
  }

  delete(id: number) {
    this.eventService.delete(id).subscribe(() => {
      this.reloadData();
    });
  }

  edit(eventType: Event) {
    this.router.navigate(['dashboard/event-type/add'], { state: eventType });
  }

}
