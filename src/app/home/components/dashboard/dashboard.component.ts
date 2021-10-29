import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/model/Project';
import { Screen } from 'src/app/shared/model/Screen';
import { Version } from 'src/app/shared/model/Version';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  projectId!: number;
  versionId!: number;
  screenId!: number;

  projects!: Project[];
  versionsSelect!: Version[];

  screens!: Screen[];
  screenSelecionada!: Screen;

  paiEIrmaos!: Screen[];
  atualEIrmaos!: Screen[];
  filhos!: Screen[];

  constructor(
    private projectService: ProjectService,
    private versionService: VersionService,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
    });
  }

  handleProjectChange() {
    this.versionService.getByProjectId(this.projectId).subscribe((versions) => {
      this.versionsSelect = versions;
    });
  }

  handleVersionChange() {
    this.screenService.getByVersionId(this.versionId).subscribe((screens) => {
      this.screens = screens;

      this.atualEIrmaos = this.screens.filter((screen) => screen.fatherScreenId === null);

      this.screenSelecionada = this.screens.find(
        (screen) => !screen.fatherScreenId
      ) as Screen;

      if (this.screenSelecionada?.id) {
        this.screenService.getByScreenFatherId(this.screenSelecionada.id).subscribe((screens) => {
          this.filhos = screens;
        });
      }
    });
  }

  handleScreenChange(id: number | undefined) {
    // setar a tela atual

    // pegar tela pai e após pegar a tela pai setar pai e irmaos baseado no id da tela avo

    // pegar atual e irmaos baseado no id da tela pai

    // pegar filhos baseados no id da tela atual

    this.screenService.getById(id as number).subscribe((screen) => {
      this.screenSelecionada = screen;
    });
  }
}
