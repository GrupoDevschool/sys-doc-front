import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/model/Project';
import { Screen } from 'src/app/shared/model/Screen';
import { Version } from 'src/app/shared/model/Version';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { Event } from './../../../shared/model/Event';
import { EventType } from './../../../shared/model/EventType';
import { EventService } from './../../../shared/services/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  projects!: Project[];

  projectControl = new FormControl();

  versions!: Version[];

  eventsType!: EventType[];
  eventTypeId!: number;
  screens!: Screen[];
  screendId!: number;

  events!: Event[];

  displayedColumns: string[] = ['id', 'active', 'order', 'parameter', 'screenId', 'eventTypeId', 'gerenciamento'];

  dataSource!: MatTableDataSource<any>;

  loading: boolean = false;

  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectsService: ProjectService,
    private versionsService: VersionService,
    private screensService: ScreenService,
    private eventsService: EventService,
    private eventTypesService: EventTypeService,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;

    this.reloadData();
  }

  reloadData() {
    this.getProjects();

    this.getEventTypes();

    this.screensService.getAll().subscribe((screens) => {
      this.screens = screens;
    });

    this.eventsService.getAll().subscribe((events) => {
      this.events = events;
      this.setDataSource();
    }).add(() => this.loading = false);
  }

  getProjects() {
    this.projectsService.getAll().subscribe((projects) => {
      this.projects = projects;
    });
  }

  getEventTypes(){
    this.eventTypesService.getAll().subscribe((eventTypes) => {
      this.eventsType = eventTypes;
    })
  }

  getVersionsByProjectId(id: number) {
    this.versions = [];

    this.versionsService.getByProjectId(id).subscribe((versions) => {
      this.versions = versions;
    });
  }

  getScreenByVersionId(id: number){
    this.loading = true;
    this.screensService.getByVersionId(id).subscribe((screens) => {
      this.screens = screens;
    }).add(() => {this.loading = false});
  }

  getEventByScreenId(id: number){
    this.loading = true;
    this.events = [];
    this.setDataSource();

    if (this.eventTypeId) {
      this.screendId = id;
      this.getEventByEventTypeIdAndScreenId(id, this.screendId);
    } else {
      this.eventsService.getByScreenId(id).subscribe((events) => {
        this.events = events;
        this.screendId = id;
        this.setDataSource();
      }).add(() =>  this.loading = false);
    }
  }

  getEventByEventTypeId(id: number) {
    this.loading = true;
    this.events = [];
    this.setDataSource();

    if (this.screendId) {
      this.eventTypeId = id;
      this.getEventByEventTypeIdAndScreenId(id, this.screendId);
    } else {
      this.eventsService.getByEventTypeId(id).subscribe((event) => {
        this.events = event;
        this.eventTypeId = id;
        this.setDataSource();
      }).add(() => this.loading = false);
    }
  }

  getEventByEventTypeIdAndScreenId(eventTypeId: number, screenId: number){
    this.loading = true;
    this.events = [];
    this.setDataSource();

    this.eventsService.getByEventTypeIdAndScreenId(eventTypeId, screenId).subscribe((events) => {
      this.events = events;
      this.setDataSource();
    }).add(() => {this.loading = false});
  }

  getScreenName(id: number){
    const screen = this.screens.find((element) => element.id == id);

    return screen?.name ?? '';
  }

  getEventTypeName(id: number): string{
    const eventType = this.eventsType.find((element) => element.id == id);

    return eventType?.name ?? '';
  }


  setDataSource() {
    this.dataSource = new MatTableDataSource(this.events);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number){
    this.eventsService.delete(id).subscribe(() => {
      this.events = this.events.filter((element) => element.id != id)
      }
    )

    this.reloadData();
  }

  edit(event: Event){
    this.router.navigate(['dashboard/event/add'], { state: event });
  }

}
