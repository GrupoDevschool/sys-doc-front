import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/shared/model/Project';
import { CreateVersion, Version } from 'src/app/shared/model/Version';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { VersionService } from 'src/app/shared/services/version/version.service';

@Component({
  selector: 'app-version-form',
  templateUrl: './version-form.component.html',
  styleUrls: ['./version-form.component.scss']
})
export class VersionFormComponent implements OnInit {

  versionForm!: FormGroup;
  matcher = new ErrorStateMatcher;
  loading: boolean = false;
  updateVersion: Version | undefined;
  projects!: Project[];

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private versionService: VersionService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as Version;
    this.updateVersion = state;
  }

  ngOnInit(): void {
    this.getProjects();

    this.versionForm = this.formBuilder.group({
      id: new FormControl(this.updateVersion?.id ?? null),
      number: new FormControl(this.updateVersion?.number ?? '', [Validators.required]),
      description: new FormControl(this.updateVersion?.description ?? '', [Validators.required]),
      active: new FormControl(this.updateVersion?.active? true : false, [Validators.required]),
      date: new FormControl(this.updateVersion?.date ?? '', [Validators.required]),
      order: new FormControl(this.updateVersion?.order ?? null, [Validators.required]),
      versionCloneId: new FormControl(),
      gmud: new FormControl(this.updateVersion?.gmud ?? '', [Validators.required]),
      projectId: new FormControl(this.updateVersion?.projectId ?? null, [Validators.required])
    })
  }

  submit() {
    if (this.versionForm.valid) {
      const formFields = this.versionForm.getRawValue();

      this.loading = true;

      if (formFields.id) {
        const updateVersion: CreateVersion = {
          id: formFields.id,
          versionNumber: formFields.number,
          description: formFields.description,
          deployDate: formFields.date,
          status: formFields.active,
          order: formFields.order,
          projectId: formFields.projectId,
          gmud: formFields.gmud
        }

        if (formFields.versionCloneId) {
          updateVersion.versionCloneId = formFields.versionCloneId;
        }

        this.versionService.update(updateVersion).subscribe(
          data => {
            this.showSucess("Versão atualizada com sucesso!");
            this.router.navigate(['dashboard/project']);
          },
          error => {
            this.showError(error.message);
          }
        ).add(() => {
          this.loading = false;
        });

      } else {
        const newVersion: CreateVersion = {
          versionNumber: formFields.number,
          description: formFields.description,
          deployDate: formFields.date,
          status: formFields.active,
          order: formFields.order,
          projectId: formFields.projectId,
          gmud: formFields.gmud
        }

        if (formFields.versionCloneId) {
          newVersion.versionCloneId = formFields.versionCloneId;
        }

        this.versionService.create(newVersion).subscribe(
          data => {
            this.showSucess("Versão criada com sucesso!");
            this.router.navigate(['dashboard/version']);
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

  showError(message: string) {
    this.toastr.error(message, "Formulário inválido")
  }

  showSucess(message: string) {
    this.toastr.success(message, "Versão Salva")
  }

  getProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
    });
  }
}
