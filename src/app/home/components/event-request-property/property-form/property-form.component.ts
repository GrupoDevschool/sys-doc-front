import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/shared/model/Project';
import { Event } from 'src/app/shared/model/Event';
import { Screen } from 'src/app/shared/model/Screen';
import { Request } from 'src/app/shared/model/Request';
import { RequestProperty } from 'src/app/shared/model/RequestProperty';
import { Version } from 'src/app/shared/model/Version';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { EventService } from 'src/app/shared/services/event/event.service';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { RequestPropertyService } from 'src/app/shared/services/request-property/request-property.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {

  projects!: Project[];
  projectId!: number | undefined;
  versions!: Version[];
  versionId!: number | undefined;
  screens!: Screen[];
  screenId!: number | undefined;
  events!: Event[];
  eventId!: number | undefined;
  requests!: Request[];
  requestId!: number | undefined;

  requestProperties!: RequestProperty[];

  requestPropertyForm!: FormGroup;
  matcher = new ErrorStateMatcher;
  loading: boolean = false;
  updateRequestProperties: RequestProperty | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private versionService: VersionService,
    private screenService: ScreenService,
    private eventService: EventService,
    private requestService: RequestService,
    private requestPropertyService: RequestPropertyService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as RequestProperty;
    this.updateRequestProperties = state;
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllEvents();
    this.getAllRequests();

    this.requestPropertyForm = this.formBuilder.group({
      requestPropertyId: new FormControl(this.updateRequestProperties?.requestPropertyId ?? null),
      requestId: new FormControl(this.updateRequestProperties?.requestId ?? null, [Validators.required]),
      key: new FormControl(this.updateRequestProperties?.key ?? '', [Validators.required]),
      value: new FormControl(this.updateRequestProperties?.value ?? null, [Validators.required]),
      order: new FormControl(this.updateRequestProperties?.order ?? '', [Validators.required]),
    });
  }

  submit(){
    if(this.requestPropertyForm.valid) {
      const formFields = this.requestPropertyForm.getRawValue() as RequestProperty;

      this.loading = true;

      if (formFields.requestPropertyId) {
        const updateRequestProperties: any = {
          requestPropertyId: formFields.requestPropertyId,
          requestId: formFields.requestId,
          key: formFields.key,
          order: formFields.order,
          value: formFields.value,
        }

        this.requestPropertyService.update(updateRequestProperties).subscribe(
          data => {
            this.showSuccess("Propriedade da requisição atualizada com sucesso!");
            this.router.navigate(['dashboard/request-property']);
          },
          error => {
            this.showError(error.message);
          }
        ).add(() => {
          this.loading = false;
        });

      } else {
        const newRequestProperty: any = {
          requestId: formFields.requestId,
          key: formFields.key,
          value: formFields.value,
          order: formFields.order,
        }
        console.log(newRequestProperty)
        this.requestPropertyService.create(newRequestProperty).subscribe(
          data => {
            this.showSuccess("Propriedade de Requisição criada com sucesso!");
            this.router.navigate(["dashboard/request-property"]);
          },
          error => {
            this.showError(error.message);
          }
        ).add(() => {
          this.loading = false;
        })
      }
    }
  }

  getAllProjects(){
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
    })
  }

  getAllEvents(){
    this.eventService.getAll().subscribe((events) => {
      this.events = events;
    })
  }

  getAllRequests(){
    this.requestService.getAll().subscribe((requests) => {
      this.requests = requests;
    })
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

  filterRequestProperties(requestId: number) {
    this.requestId = undefined;
    this.requestPropertyService.getAllByRequestId(requestId).subscribe(requestProperties => {
      this.requestId = requestId;
      this.requestProperties = requestProperties;
    })
  }

  showError(message: string){
    this.toastr.error(message, "Formulário inválido")
  }

  showSuccess(message: string){
    this.toastr.success(message, "Propriedade de requisição Salva")
  }

}
