import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/model/Project';
import { Version } from 'src/app/shared/model/Version';
import { Screen } from 'src/app/shared/model/Screen';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';

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
      console.log(this.screens);
      this.atualEIrmaos = this.screens.filter(
        (screen) => screen.fatherScreenId == null
      );

      console.log(this.atualEIrmaos);
      this.screenSelecionada = this.screens.find(
        (s) => !s.fatherScreenId
      ) as Screen;
      console.log(this.screenSelecionada);
    });
  }

  handleScreenChange(id: number | undefined) {
    this.screenService.getById(id as number).subscribe((screen) => {
      this.screenSelecionada = screen;
    });
  }
}
