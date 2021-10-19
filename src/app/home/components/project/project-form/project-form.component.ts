import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateProject, Project } from 'src/app/shared/model/Project';
import { ProjectService } from 'src/app/shared/services/project/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  matcher = new ErrorStateMatcher;
  loading: boolean = false;
  updateProject: Project | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as Project;
    this.updateProject = state;
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      id: new FormControl(this.updateProject?.id ?? null),
			name: new FormControl(this.updateProject?.name ?? '', [Validators.required]),
			active: new FormControl(this.updateProject?.active? true : false, [Validators.required]),
		})
  }

  submit() {
		if (this.projectForm.valid) {
			const formFields = this.projectForm.getRawValue() as Project; // Pega os valores dos inputs

      this.loading = true;

      if (formFields.id) {
        const updatedProject: CreateProject = {
          id: formFields.id,
          name: formFields.name,
          status: formFields.active
        }

        console.log(updatedProject);

        this.projectService.update(updatedProject).subscribe(
          data => {
            this.showSucess("Projeto atualizado com sucesso!");
            this.router.navigate(['dashboard/project']);
          },
          error => {
            this.showError(error.message);
          }
        ).add(() => {
          this.loading = false;
        });

      } else {
        const newProject: CreateProject = {
          name: formFields.name,
          status: formFields.active
        }

        this.projectService.create(newProject).subscribe(
          data => {
            this.showSucess("Projeto criado com sucesso!");
            this.router.navigate(['dashboard/project']);
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
    this.toastr.success(message, "Projeto Salvo")
  }

}
