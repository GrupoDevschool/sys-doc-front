import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Event,
  EventType,
  Project,
  Request,
  Screen,
  Version
} from 'src/app/shared/model/index';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { EventService } from 'src/app/shared/services/event/event.service';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { RequestProperty } from './../../../shared/model/RequestProperty';
import { RequestPropertyService } from './../../../shared/services/request-property/request-property.service';

@Component({
  selector: 'app-event-request-property',
  templateUrl: './event-request-property.component.html',
  styleUrls: ['./event-request-property.component.scss'],
})
export class EventRequestPropertyComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  projects!: Project[];
  versions!: Version[];
  screens!: Screen[];
  events!: Event[];
  eventTypes!: EventType[];
  requests!: Request[];

  displayedColumns: string[] = [
    'requestPropertyId',
    'requestId',
    'key',
    'value',
    'order',
    'actions',
  ];

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
    private requestPropertyService: RequestPropertyService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reloadData();
    this.getAllProjects();
    this.getAllEventTypes();
  }

  getAllProjects() {
    this.projectService.getAll().subscribe((data: Project[]) => {
      this.projects = data;
    },
    error => {
      this.showError("Houve um erro ao carregar Projetos");
    });
  }

  getAllEventTypes() {
    this.eventTypeService.getAll().subscribe((eventTypes) => {
      this.eventTypes = eventTypes;
    },
    error => {
      this.showError("Houve um erro ao carregar Tipos de Evento");
    });
  }

  getVersionsByProjectId(projectId: number) {
    this.versions = [];
    this.screens = [];
    this.events = [];
    this.requests = [];

    if (projectId) {
      this.versionService.getByProjectId(projectId).subscribe((versions) => {
        this.versions = versions;
      },
      error => {
        this.showError("Houve um erro ao carregar Vers??es");
      });
    } else {
      this.reloadData();
    }
  }

  getScreenByVersionId(versionId: number) {
    this.screens = [];
    this.events = [];
    this.requests = [];

    if (versionId) {
      this.screenService.getByVersionId(versionId).subscribe((screens) => {
        this.screens = screens;
      },
      error => {
        this.showError("Houve um erro ao carregar Telas");
      });
    } else {
      this.reloadData();
    }
  }

  getEventByScreenId(screenId: number) {
    this.events = [];
    this.requests = [];

    if (screenId) {
      this.eventService.getByScreenId(screenId).subscribe((events) => {
        this.events = events;
      },
      error => {
        this.showError("Houve um erro ao carregar Eventos");
      });
    } else {
      this.reloadData();
    }
  }

  getRequestByEventId(eventId: number) {
    this.requests = [];

    if (eventId) {
      this.requestService.getAllbyEventId(eventId).subscribe((requests) => {
        this.requests = requests;
      },
      error => {
        this.showError("Houve um erro ao carregar Requisi????es");
      });
    } else {
      this.reloadData();
    }
  }

  getRequestPropertyByRequestId(requestId: number) {
    if (requestId) {
      this.loading = true;
      this.requestPropertyService
        .getAllByRequestId(requestId)
        .subscribe((requestProperties) => {
          this.dataSource = new MatTableDataSource(requestProperties);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          this.showError("Houve um erro ao carregar Requisi????es");
        })
        .add(() => (this.loading = false));
    } else {
      this.reloadData();
    }
  }

  getEventTypeName(eventTypeId: number) {
    return (
      this.eventTypes.find((eventType) => eventType.id === eventTypeId)?.name ??
      ''
    );
  }

  reloadData() {
    this.loading = true;
    this.requestPropertyService
      .getAll()
      .subscribe((requestProperties) => {
        this.dataSource = new MatTableDataSource(requestProperties);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error => {
        this.showError("Houve um erro ao carregar Propriedades de Requisi????o");
      })
      .add(() => (this.loading = false));
  }

  delete(id: number) {
    this.requestPropertyService.delete(id).subscribe(() => {
      this.reloadData();
      this.showSucess();
    },
    error => {
      this.showError("N??o foi possivel deletar a Propriedade de Requisi????o");
    });
  }

  edit(requestProperty: RequestProperty) {
    this.router.navigate(['dashboard/request-property/add'], {
      state: requestProperty,
    });
  }

  showError(message: string) {
    this.toastr.error(message)
  }

  showSucess() {
    this.toastr.success("Propriedade de requisi????o deletado com sucesso");
  }
}
