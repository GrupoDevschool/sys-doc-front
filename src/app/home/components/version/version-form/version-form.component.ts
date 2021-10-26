import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateVersion, Version } from 'src/app/shared/model/Version';
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
  createVersion: CreateVersion | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private versionService: VersionService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state as Version;
    this.updateVersion = state;
  }

  ngOnInit(): void {
    this.versionForm = this.formBuilder.group({
      id: new FormControl(this.updateVersion?.id ?? null),
      versionNumber: new FormControl(this.createVersion?.versionNumber ?? '', [Validators.required]),
      description: new FormControl(this.createVersion?.description ?? '', [Validators.required]),
      deployDate: new FormControl(this.createVersion?.deployDate ?? '', [Validators.required]),
      status: new FormControl(this.createVersion?.status? true : false, [Validators.required]),
      order: new FormControl(this.createVersion?.order ?? '', [Validators.required]),
      versionCloneId: new FormControl(this.createVersion?.order ?? '', [Validators.required]),
      gmud: new FormControl(this.updateVersion?.gmud ?? '', [Validators.required]),
      projectId: new FormControl(this.createVersion?.projectId ?? '', [Validators.required])
    })
  }

  submit() {
    if (this.versionForm.valid) {
      const formFields = this.versionForm.getRawValue() as CreateVersion;

      this.loading = true;

      if (formFields.id) {
        const updateVersion: CreateVersion = {
          id: formFields.id,
          versionNumber: formFields.versionNumber,
          description: formFields.description,
          deployDate: formFields.deployDate,
          status: formFields.status,
          order: formFields.order,
          versionCloneId: formFields.versionCloneId,
          projectId: formFields.projectId,
          gmud: formFields.gmud
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
          versionNumber: formFields.versionNumber,
          description: formFields.description,
          deployDate: formFields.deployDate,
          status: formFields.status,
          order: formFields.order,
          versionCloneId: formFields.versionCloneId,
          projectId: formFields.projectId,
          gmud: formFields.gmud
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
}
