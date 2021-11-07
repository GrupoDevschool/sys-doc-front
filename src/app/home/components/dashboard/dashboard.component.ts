import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Project, Screen, Version } from 'src/app/shared/model';
import { EventService } from 'src/app/shared/services/event/event.service';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    items: 3,
  };

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
    private screenService: ScreenService,
    private eventService: EventService
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

      this.atualEIrmaos = this.screens.filter(
        (screen) => screen.fatherScreenId === undefined
      );

      this.screenSelecionada = this.screens.find(
        (screen) => screen.fatherScreenId === undefined
      ) as Screen;

      if (this.screenSelecionada?.id) {
        this.screenService
          .getByScreenFatherId(this.screenSelecionada.id)
          .subscribe((screens) => {
            this.filhos = screens;
          });
      }

      if (this.screenSelecionada?.fatherScreenId) {
        this.screenService
          .getById(this.screenSelecionada.fatherScreenId)
          .subscribe((screen) => {
            if (screen.fatherScreenId) {
              this.screenService
                .getByScreenFatherId(screen.fatherScreenId)
                .subscribe((screens) => {
                  this.paiEIrmaos = screens;
                });
            }
          });
      }
    });
  }

  handleScreenChange(screen: Screen) {
    // set pai e irmãos
      if (screen.fatherScreenId) {
        this.screenService
          .getSisters(screen.fatherScreenId)
          .subscribe((screens) => {
            this.paiEIrmaos = screens;
          });
      } else {
        this.paiEIrmaos = [];
      }

      // set atual e irmãos
      if (screen.fatherScreenId) {
        this.screenService
          .getByScreenFatherId(screen.fatherScreenId)
          .subscribe((screens) => {
            this.atualEIrmaos = screens;
            this.screenSelecionada = screen;
          });
      } else {
        this.screenService
          .getByVersionId(this.versionId)
          .subscribe((screens) => {
            this.atualEIrmaos = screens.filter(
              (screen) => screen.fatherScreenId === undefined
            );
          });
      }

      // set filhos
      this.screenService
        .getByScreenFatherId(screen.id)
        .subscribe((screens) => {
          this.filhos = screens;
        });
  }
}
