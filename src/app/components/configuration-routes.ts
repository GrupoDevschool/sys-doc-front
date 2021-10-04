
import { AuthGuardService } from '../login/auth-guard.service';
import { EventRequestPropertyComponent } from './event-request-property/event-request-property.component';
import { PropertyFormComponent } from './event-request-property/property-form/property-form.component';
import { EventRequestComponent } from './event-request/event-request.component';
import { RequestFormComponent } from './event-request/request-form/request-form.component';
import { EventTypeFormComponent } from './event-type/event-type-form/event-type-form.component';
import { EventTypeComponent } from './event-type/event-type.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { EventComponent } from './event/event.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { ProjectComponent } from './project/project.component';
import { ScreenFormComponent } from './screen/screen-form/screen-form.component';
import { ScreenComponent } from './screen/screen.component';
import { VersionFormComponent } from './version/version-form/version-form.component';
import { VersionComponent } from './version/version.component';

export const LIST_ROUTES = [
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

export const FORM_ROUTES = [
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
