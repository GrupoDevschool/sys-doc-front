import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/shared/model/Event';
import { Project } from 'src/app/shared/model/Project';
import { Request } from 'src/app/shared/model/Request';
import { Screen } from 'src/app/shared/model/Screen';
import { Version } from 'src/app/shared/model/Version';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { EventService } from 'src/app/shared/services/event/event.service';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  projects!: Project[];
  projectId!: number | undefined;
  versions!: Version[];
  versionId!: number | undefined;
  screens!: Screen[];
  screenId!: number | undefined;

  events!: Event[];
  eventId!: number | undefined;

  requests!: Request[];

  requestForm!: FormGroup;
  matcher = new ErrorStateMatcher;
  loading: boolean = false;
  updateRequest: Request | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private versionService: VersionService,
    private screenService: ScreenService,
    private eventService: EventService,
    private eventTypeService: EventTypeService,
    private requestService: RequestService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as Request;
    this.updateRequest = state;
  }

  ngOnInit(): void {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
    })

    this.eventService.getAll().subscribe((events) => {
      this.events = events;
    })

    this.requestForm = this.formBuilder.group({
      id: new FormControl(this.updateRequest?.id ?? null),
      eventId: new FormControl(this.updateRequest?.eventId ?? null, [Validators.required]),
      description: new FormControl(this.updateRequest?.description ?? '', [Validators.required]),
      layer: new FormControl(this.updateRequest?.layer ?? '', [Validators.required]),
      status: new FormControl(this.updateRequest?.status? true : false, [Validators.required]),
      uri_homolog: new FormControl(this.updateRequest?.uri_homolog ?? '', [Validators.required]),
      uri_prod: new FormControl(this.updateRequest?.uri_prod ?? '', [Validators.required]),
      requestFatherId: new FormControl(this.updateRequest?.requestFatherId ?? null),
      order: new FormControl(this.updateRequest?.order ?? null, [Validators.required]),
    });

    if (this.updateRequest?.eventId) {
      this.eventId = this.updateRequest.eventId;

      this.requestService.getAllbyEventId(this.eventId).subscribe((requests) => {
        this.requests = requests;
      })

    }
  }

  submit() {
    if (this.requestForm.valid) {
      const formFields = this.requestForm.getRawValue() as Request;

      this.loading = true;

      if (formFields.id) {
        const updateRequest: any = {
          id: formFields.id,
          uri_homolog : formFields.uri_homolog,
          eventId: formFields.eventId,
          uri_prod: formFields.uri_prod,
          description: formFields.description,
          layer: formFields.layer,
          status: formFields.status,
          order: formFields.order,
        }

        if (formFields.requestFatherId){
          updateRequest.requestFatherId = formFields.requestFatherId;
        }

        this.requestService.update(updateRequest).subscribe(
          data => {
            this.showSuccess("Requisição atualizada com sucesso!");
            this.router.navigate(['dashboard/event-request']);
          },
          error => {
            this.showError(error.error.message);
          }
        ).add(() => {
          this.loading = false;
        });

      } else {
        const newRequest: any = {
          uri_homolog : formFields.uri_homolog,
          eventId: formFields.eventId,
          uri_prod: formFields.uri_prod,
          description: formFields.description,
          layer: formFields.layer,
          status: formFields.status,
          order: formFields.order,
        }

        if (formFields.requestFatherId){
          newRequest.requestFatherId = formFields.requestFatherId;
        }

        this.requestService.create(newRequest).subscribe(
          data => {
            this.showSuccess("Requisição criada com sucesso!");
            this.router.navigate(["dashboard/event-request"]);
          },
          error => {
            this.showError(error.error.message);
          }
        ).add(() => {
          this.loading = false;
        })
      }
    }
  }

  showError(message: string){
    this.toastr.error(message, "Formulário inválido")
  }

  showSuccess(message: string){
    this.toastr.success(message, "Requisição Salva")
  }

  filterVersions(projectId: number) {
    this.projectId = undefined;
    this.versionService.getByProjectId(projectId).subscribe(versions => {
      this.projectId = projectId;
      this.versions = versions;
    });
  }

  filterScreens(versionId: number) {
    this.versionId = undefined;
    this.screenService.getByVersionId(versionId).subscribe(screens => {
      this.versionId = versionId;
      this.screens = screens
    });
  }

  filterEvents(screenId: number)  {
    this.screenId = undefined;
    this.eventService.getByScreenId(screenId).subscribe(events => {
      this.screenId = screenId;
      this.events = events;
    });
  }

  filterRequests(eventId: number){
    this.eventId = undefined;
    this.requestService.getAllbyEventId(eventId).subscribe(requests => {
      this.eventId = eventId;
      this.requests = requests;
    });
  }

  getProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
    })
  }

}
