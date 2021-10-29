import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { createScreen, Screen } from 'src/app/shared/model/Screen';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from './../../../../shared/services/version/version.service';

@Component({
  selector: 'app-screen-form',
  templateUrl: './screen-form.component.html',
  styleUrls: ['./screen-form.component.scss']
})
export class ScreenFormComponent implements OnInit {

  screenForm!: FormGroup;
  matcher = new ErrorStateMatcher;
  loading: boolean = false;
  updateScreen: Screen | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private versionService: VersionService,
    private screenService: ScreenService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as Screen;
    this.updateScreen = state;
  }

  ngOnInit(): void {
    this.screenForm = this.formBuilder.group({
      id: new FormControl(this.updateScreen?.id ?? null),
      active: new FormControl(this.updateScreen?.active? true : false, [Validators.required]),
			name: new FormControl(this.updateScreen?.name ?? '', [Validators.required]),
  		versionId: new FormControl(this.updateScreen?.versionId ?? null, [Validators.required]),
      image: new FormControl(this.updateScreen?.image ?? '', [Validators.required]),
      order: new FormControl(this.updateScreen?.order ?? null, [Validators.required]),
      urlog: new FormControl(this.updateScreen?.urlog ?? '', [Validators.required]),
      versionClonedId: new FormControl(this.updateScreen?.versionClonedId ?? null),
      fatherScreenId: new FormControl(this.updateScreen?.fatherScreenId ?? null),
		})
  }

	fatherScreenId?: number;
	versionClonedId?:  number;

  submit() {
		if (this.screenForm.valid) {
			const formFields = this.screenForm.getRawValue() as Screen; // Pega os valores dos inputs

      this.loading = true;

      if (formFields.id) {
        const updatedScreen: createScreen = {
          id: formFields.id,
          name: formFields.name,
          image: formFields.image,
          active: formFields.active,
          order: formFields.order,
          urlog: formFields.urlog,
          versionId: formFields.versionId,
        }

        if (formFields.fatherScreenId) {updatedScreen.screenFatherId = formFields.fatherScreenId}
        if (formFields.versionClonedId) {updatedScreen.cloneVersionId = formFields.versionClonedId}

        this.screenService.update(updatedScreen).subscribe(
          data => {
            this.showSucess("Tela atualizada com sucesso!");
            this.router.navigate(['dashboard/screen']);
          },
          error => {
            this.showError(error.message);
          }
        ).add(() => {
          this.loading = false;
        });

      } else {
        const newScreen: createScreen = {
          name: formFields.name,
          image: formFields.image,
          active: formFields.active,
          order: formFields.order,
          urlog: formFields.urlog,
          versionId: formFields.versionId,
          screenFatherId: formFields.fatherScreenId,
          cloneVersionId: formFields.versionClonedId,
        }

        this.screenService.create(newScreen).subscribe(
          data => {
            this.showSucess("Tela criada com sucesso!");
            this.router.navigate(['dashboard/Screen']);
          },
          error => {
            this.showError(error.message);
          }
        ).add(() => {
          this.loading = false;
        });
      }

		}
	}

  showError(message: string){
    this.toastr.error(message, "Formulário inválido")
  }

  showSucess(message: string){
    this.toastr.success(message, "Tela Salva")
  }

}
