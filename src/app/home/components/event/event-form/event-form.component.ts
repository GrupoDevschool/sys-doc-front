import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { Event } from './../../../../shared/model/Event';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { EventService } from 'src/app/shared/services/event/event.service';
import { Project } from 'src/app/shared/model/Project';
import { Version } from 'src/app/shared/model/Version';
import { EventType } from 'src/app/shared/model/EventType';
import { Screen } from 'src/app/shared/model/Screen';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  projects!: Project[];
  projectId!: number | undefined;
  versions!: Version[];
  versionId!: number | undefined;
  screens!: Screen[];
  eventTypes!: EventType[];
  eventTypeId: number | undefined;

  eventForm!: FormGroup;
  matcher = new ErrorStateMatcher;
  loading: boolean = false;
  updateEvent: Event | undefined

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private versionService: VersionService,
    private screenService: ScreenService,
    private eventService: EventService,
    private eventTypeService: EventTypeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as Event;
    this.updateEvent = state;
   }

  ngOnInit(): void {

    this.getProjects();

    this.getScreens();

    this.getEventsType();

    this.eventForm = this.formBuilder.group({
      id: new FormControl(this.updateEvent?.id ?? null),
      active: new FormControl(this.updateEvent?.active? true : false, [Validators.required]),
      order: new FormControl(this.updateEvent?.order ?? null, [Validators.required]),
      parameter: new FormControl(this.updateEvent?.parameter ?? '', [Validators.required]),
  		screenId: new FormControl(this.updateEvent?.screenId ?? null, [Validators.required]),
      eventTypeId: new FormControl(this.updateEvent?.eventTypeId ?? null, [Validators.required])
    })
  }

  submit() {
    if (this.eventForm.valid) {
      const formFields = this.eventForm.getRawValue() as Event;

      this.loading = true;

      if (formFields.id) {
        const updateEvent: Event = {
          id: formFields.id,
          active: formFields.active,
          order: formFields.order,
          parameter: formFields.parameter,
          screenId: formFields.screenId,
          eventTypeId: formFields.eventTypeId
        }

        this.eventService.update(updateEvent).subscribe(
          data => {
            this.showSuccess("Evento atualizado com sucesso!");
            this.router.navigate(['dashboard/event']);
          },
          error => {
            this.showError(error.message);
          }
        ).add(() => {
          this.loading = false;
        });

      } else {
        const newEvent: Event = {
          active: formFields.active,
          order: formFields.order,
          parameter: formFields.parameter,
          screenId: formFields.screenId,
          eventTypeId: formFields.eventTypeId
        }

        this.eventService.create(newEvent).subscribe(
          data => {
            this.showSuccess("Evento criado com sucesso!");
            this.router.navigate(["dashboard/event"]);
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

  showError(message: string){
    this.toastr.error(message, "Formulário inválido")
  }

  showSuccess(message: string){
    this.toastr.success(message, "Evento Salvo")
  }

  getProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
    })
  }

  getEventsType() {
    this.eventTypeService.getAll().subscribe((eventTypes) => {
      this.eventTypes = eventTypes;
    })
  }

  getScreens() {
    this.screenService.getAll().subscribe((screens) => {
      this.screens = screens;
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

}
