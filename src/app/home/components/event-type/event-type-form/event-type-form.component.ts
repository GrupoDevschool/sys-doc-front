import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventType } from 'src/app/shared/model/EventType';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';

@Component({
  selector: 'app-event-type-form',
  templateUrl: './event-type-form.component.html',
  styleUrls: ['./event-type-form.component.scss'],
})
export class EventTypeFormComponent implements OnInit {
  eventTypeForm!: FormGroup;
  matcher = new ErrorStateMatcher();
  loading: boolean = false;
  updateEventType: EventType | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private eventTypeService: EventTypeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras
      ?.state as EventType;
    this.updateEventType = state;
  }

  ngOnInit(): void {
    this.eventTypeForm = this.formBuilder.group({
      id: new FormControl(this.updateEventType?.id ?? null),
      name: new FormControl(this.updateEventType?.name ?? '', [
        Validators.required,
      ]),
      status: new FormControl(this.updateEventType?.status ? true : false, [
        Validators.required,
      ]),
    });
  }

  submit() {
    if (this.eventTypeForm.valid) {
      const formFields = this.eventTypeForm.getRawValue() as EventType; // Pega os valores dos inputs

      this.loading = true;

      if (formFields.id) {
        const updatedProject: EventType = {
          id: formFields.id,
          name: formFields.name,
          status: formFields.status,
        };

        console.log(updatedProject);

        this.eventTypeService
          .update(updatedProject)
          .subscribe(
            (data) => {
              this.showSucess('Tipo de evento atualizado com sucesso!');
              this.router.navigate(['dashboard/event-type']);
            },
            (error) => {
              this.showError(error.message);
            }
          )
          .add(() => {
            this.loading = false;
          });
      } else {
        const newProject: EventType = {
          name: formFields.name,
          status: formFields.status,
        };

        this.eventTypeService
          .create(newProject)
          .subscribe(
            (data) => {
              this.showSucess('Projeto criado com sucesso!');
              this.router.navigate(['dashboard/event-type']);
            },
            (error) => {
              this.showError(error.message);
            }
          )
          .add(() => {
            this.loading = false;
          });
      }
    }
  }

  showError(message: string) {
    this.toastr.error(message, 'Formulário inválido');
  }

  showSucess(message: string) {
    this.toastr.success(message, 'Tipo de evento salvo');
  }
}
