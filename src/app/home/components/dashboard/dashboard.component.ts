import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/model/Project';
import { Screen } from 'src/app/shared/model/Screen';
import { Version } from 'src/app/shared/model/Version';
import { Event } from 'src/app/shared/model/Event';
import { EventService } from 'src/app/shared/services/event/event.service';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { ScreenService } from 'src/app/shared/services/screen/screen.service';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    center: true,
    items: 3,
    nav: true,
  };

  projectId!: number;
  versionId!: number;
  screenId!: number;

  projects!: Project[];
  versionsSelect!: Version[];

  screens!: Screen[];
  screenSelecionada!: Screen;
  events!: Event[];

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

      if (this.screenSelecionada.id) {
        this.eventService
          .getByScreenId(this.screenSelecionada.id)
          .subscribe((events) => {
            this.events = events;
          });
      }

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

  handleScreenChange(id: number | undefined) {
    // setar a tela atual

    // pegar tela pai e após pegar a tela pai setar pai e irmaos baseado no id da tela avo

    // pegar atual e irmaos baseado no id da tela pai

    // pegar filhos baseados no id da tela atual

    this.screenService.getById(id as number).subscribe((screen) => {
      this.screenSelecionada = screen;

      if (this.screenSelecionada.id) {
        this.eventService
          .getByScreenId(this.screenSelecionada.id)
          .subscribe((events) => {
            this.events = events;
          });
      }

      if (this.screenSelecionada.fatherScreenId) {
        this.screenService
          .getByScreenFatherId(this.screenSelecionada.fatherScreenId)
          .subscribe((screens) => {
            this.atualEIrmaos = screens;
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

      if (this.screenSelecionada.id) {
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
            } else {
              this.screenService
                .getByVersionId(this.versionId)
                .subscribe((screens) => {
                  this.paiEIrmaos = screens.filter(
                    (screen) => screen.fatherScreenId === undefined
                  );
                  console.log(this.paiEIrmaos);
                });
            }
          });
      } else {
        this.paiEIrmaos = [];
      }
    });
  }
}
