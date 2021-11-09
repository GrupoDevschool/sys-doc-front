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
  screenSelecionada!: Screen | null;

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
      this.projects = projects.filter((project) => project.active).sort(
        (a, b) => a.name.localeCompare(b.name)
      );
    });
  }

  handleProjectChange() {
    this.versionsSelect = [];
    this.atualEIrmaos = [];
    this.paiEIrmaos = [];
    this.filhos = [];
    this.screens = [];
    this.screenSelecionada = null;
    this.versionId = 0;

    this.versionService.getByProjectId(this.projectId).subscribe((versions) => {
      this.versionsSelect = versions.filter((version) => version.active).sort(
        (a, b) => {
          if (a.number.localeCompare(b.number) === 0) {
            return a.order - b.order;
          } else {
            return a.number.localeCompare(b.number);
          }
        }
      );
    });
  }

  handleVersionChange() {
    this.screenService.getByVersionId(this.versionId).subscribe((screens) => {
      this.screens = screens.sort((a, b) => a.order - b.order);

      // set atual e irmãos
      this.atualEIrmaos = this.screens.filter(
        (screen) => screen.fatherScreenId === null
      );

      // set atual
      this.screenSelecionada = this.screens.find(
        (screen) => screen.fatherScreenId === null
      ) as Screen;


      // set Filhos
      if (this.screenSelecionada.id) {
        this.screenService
          .getByScreenFatherId(this.screenSelecionada.id)
          .subscribe((screens) => {
            this.filhos = screens.sort((a, b) => a.order - b.order);
          });
      }

      // set Pai
      if (this.screenSelecionada.fatherScreenId) {
        this.screenService
          .getSisters(this.screenSelecionada.fatherScreenId)
          .subscribe((screens) => {
            this.paiEIrmaos = screens.sort((a, b) => a.order - b.order);
          });
      } else {
        this.paiEIrmaos = [];
      }

    });
  }

  handleScreenChange(screen: Screen) {
    // set pai e irmãos
      if (screen.fatherScreenId) {
        this.screenService
          .getSisters(screen.fatherScreenId)
          .subscribe((screens) => {
            this.paiEIrmaos = screens.sort((a, b) => a.order - b.order);
          });
      } else {
        this.paiEIrmaos = [];
      }

      // set atual e irmãos
      if (screen.fatherScreenId) {
        this.screenService
          .getByScreenFatherId(screen.fatherScreenId)
          .subscribe((screens) => {
            this.atualEIrmaos = screens.sort((a, b) => a.order - b.order);
            this.screenSelecionada = screen;
          });
      } else {
        this.screenService
          .getByVersionId(this.versionId)
          .subscribe((screens) => {
            this.atualEIrmaos = screens.filter(
              (screen) => screen.fatherScreenId === null
            ).sort((a, b) => a.order - b.order);
            this.screenSelecionada = screen;
          });
      }

      // set filhos
      this.screenService
        .getByScreenFatherId(screen.id)
        .subscribe((screens) => {
          this.filhos = screens.sort((a, b) => a.order - b.order);
        });
  }
}
