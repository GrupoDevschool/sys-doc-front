
import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/login/auth-guard.service';
import { EventRequestPropertyComponent } from './components/event-request-property/event-request-property.component';
import { PropertyFormComponent } from './components/event-request-property/property-form/property-form.component';
import { EventRequestComponent } from './components/event-request/event-request.component';
import { RequestFormComponent } from './components/event-request/request-form/request-form.component';
import { EventTypeFormComponent } from './components/event-type/event-type-form/event-type-form.component';
import { EventTypeComponent } from './components/event-type/event-type.component';
import { EventFormComponent } from './components/event/event-form/event-form.component';
import { EventComponent } from './components/event/event.component';
import { ProjectFormComponent } from './components/project/project-form/project-form.component';
import { ProjectComponent } from './components/project/project.component';
import { ScreenFormComponent } from './components/screen/screen-form/screen-form.component';
import { ScreenComponent } from './components/screen/screen.component';
import { VersionFormComponent } from './components/version/version-form/version-form.component';
import { VersionComponent } from './components/version/version.component';


export const LIST_ROUTES: Routes = [
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'version',
    component: VersionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'screen',
    component: ScreenComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'event',
    component: EventComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'event-type',
    component: EventTypeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'event-request',
    component: EventRequestComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'request-property',
    component: EventRequestPropertyComponent,
    canActivate: [AuthGuardService],
  },
];

export const FORM_ROUTES: Routes = [
  {
    path: 'project/add',
    component: ProjectFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'version/add',
    component: VersionFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'screen/add',
    component: ScreenFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'event/add',
    component: EventFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'event-type/add',
    component: EventTypeFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'event-request/add',
    component: RequestFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'request-property/add',
    component: PropertyFormComponent,
    canActivate: [AuthGuardService],
  },
]
