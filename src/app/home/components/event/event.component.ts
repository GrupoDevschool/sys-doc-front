import { EventService } from './../../../shared/services/event/event.service';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { EventType } from './../../../shared/model/EventType';
import { Event } from './../../../shared/model/Event';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/model/Project';
import { Version } from 'src/app/shared/model/Version';
import { Screen } from 'src/app/shared/model/Screen';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  projects!: Project[];
  filteredProjects!: Observable<Project[]>;

  projectControl = new FormControl();

  versions!: Version[];
  filteredVersions!: Observable<Version[]>;

  eventsType!: EventType[];

  screens!: Screen[];
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
    console.log(this.loading);
    this.screens = [];
    this.setDataSource();

    this.screensService.getByVersionId(id).subscribe((screens) => {
      this.screens = screens;
      this.setDataSource();
    }).add(() => {this.loading = false});
  }

  getEventByScreenId(id: number){
    this.loading = true;
    console.log(this.loading);
    this.events = [];
    this.setDataSource();

    this.eventsService.getByScreenId(id).subscribe((events) => {
      this.events = events;
      this.setDataSource();
    }).add(() => {this.loading = false});
  }

  getEventTypeByEventId(id: number) {
    this.loading = true;
    console.log(this.loading);
    this.events = [];
    this.setDataSource();

    this.eventsService.getByEventTypeId(id).subscribe((eventsType) => {
      this.eventsType = eventsType;
      this.setDataSource();
    }).add(() => {this.loading = false});
  }

  getScreenName(id: number){
    const screen = this.screens.find((element) => element.id == id);

    return screen?.name ?? '';
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
