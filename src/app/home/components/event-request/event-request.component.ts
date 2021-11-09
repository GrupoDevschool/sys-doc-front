import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  styleUrls: ['./event-request.component.scss'],
})
export class EventRequestComponent implements OnInit {
  dataSource!: MatTableDataSource<Request>;

  projects!: Project[];
  versions!: Version[];
  screens!: Screen[];
  events!: Event[];
  eventTypes!: EventType[];

  displayedColumns: string[] = [
    'id',
    'eventId',
    'description',
    'uri_homolog',
    'uri_prod',
    'layer',
    'status',
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
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reloadData();

    this.projectService.getAll().subscribe((data: Project[]) => {
      this.projects = data;
    },
    error => {
      this.showError("Houve um erro ao carregar Projetos");
    });

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

    if (projectId) {
      this.versionService.getByProjectId(projectId).subscribe((versions) => {
        this.versions = versions;
      },
      error => {
        this.showError("Houve um erro ao carregar versões");
      });
    } else {
      this.reloadData();
    }
  }

  getScreenByVersionId(versionId: number) {
    this.screens = [];
    this.events = [];

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
    if (eventId) {
    this.loading = true;
    this.requestService
      .getAllbyEventId(eventId)
      .subscribe((requests) => {
        this.dataSource = new MatTableDataSource(requests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.showError("Houve um erro ao carregar Requisições");
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
    this.requestService
      .getAll()
      .subscribe((requests) => {
        this.dataSource = new MatTableDataSource(requests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error => {
        this.showError("Houve um erro ao carregar Requisições");
      })
      .add(() => (this.loading = false));
  }

  delete(id: number) {
    this.requestService.delete(id).subscribe(() => {
      this.reloadData();
      this.showSucess();
    },
    error => {
      if (error.status == 400) {
        this.showError("Não é possivel deletar uma Requisição com propriedades cadastradas");
      } else {
        this.showError("Não foi possivel deletar a Requisição");
      }
    });
  }

  edit(request: Request) {
    this.router.navigate(['dashboard/event-request/add'], { state: request });
  }

  showError(message: string) {
    this.toastr.error(message)
  }

  showSucess() {
    this.toastr.success("Requisição deletada com sucesso")
  }
}
