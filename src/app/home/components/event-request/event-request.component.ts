import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Event } from 'src/app/shared/model/Event';
import { EventType } from 'src/app/shared/model/EventType';
import { Project } from 'src/app/shared/model/Project';
import { Request } from 'src/app/shared/model/Request';
import { Screen } from 'src/app/shared/model/Screen';
import { Version } from 'src/app/shared/model/Version';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { EventService } from './../../../shared/services/event/event.service';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.scss']
})
export class EventRequestComponent implements OnInit {
  dataSource!: MatTableDataSource<Request>;

  projects!: Project[];
  versions!: Version[];
  screens!: Screen[];
  events!: Event[];
  eventTypes!: EventType[];

  displayedColumns: string[] = ['id', 'eventId', 'description' ,'uri_homolog', 'uri_prod', 'layer', 'status', 'order','actions'];

  selection = new SelectionModel<string>(true, []);

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectService: ProjectService,
    private versionService: VersionService,
    private screenService: ScreenService,
    private eventTypeService: EventTypeService,
    private eventService: EventService,
    private requestService: RequestService,
    private router: Router
    ) {

    }

  ngOnInit(): void {
    this.reloadData();

    this.projectService.getAll().subscribe(
      (data: Project[]) => {
        this.projects = data;
      }
    );

    this.eventTypeService.getAll().subscribe(eventTypes => {
        this.eventTypes = eventTypes;
      }
    );
  }

  getVersionsByProjectId(projectId: number) {
    this.versionService.getByProjectId(projectId).subscribe(versions => {
      this.versions = versions;
    });
  }

  getScreenByVersionId(versionId: number) {
    this.screenService.getByVersionId(versionId).subscribe(screens => {
      this.screens = screens;
    });
  }

  getEventByScreenId(screenId: number) {
    this.eventService.getByScreenId(screenId).subscribe(events => {
      this.events = events;
    });
  }

  getRequestByEventId(eventId: number) {
    this.loading = true;

    this.requestService.getAllbyEventId(eventId).subscribe(requests => {
      this.dataSource = new MatTableDataSource(requests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).add(() => this.loading = false);
  }

  getEventTypeName(eventTypeId: number) {
    return this.eventTypes.find(eventType => eventType.id === eventTypeId)?.name ?? '';
  }

  reloadData() {
    this.loading = true;
    this.requestService.getAll().subscribe(
      requests => {
        this.dataSource = new MatTableDataSource(requests);
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

  edit(request: Request) {
    this.router.navigate(['dashboard/request/add'], { state: request });
  }

}
