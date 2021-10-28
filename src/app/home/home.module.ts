import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { SharedModule } from '../shared/module/shared.module';
import { MaterialCommonModule } from './../shared/module/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemComponent } from './menu/item/item.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    ProjectComponent,
    VersionComponent,
    ScreenComponent,
    EventComponent,
    EventTypeComponent,
    EventRequestComponent,
    EventRequestPropertyComponent,
    ProjectFormComponent,
    PropertyFormComponent,
    RequestFormComponent,
    EventTypeFormComponent,
    EventFormComponent,
    ScreenFormComponent,
    VersionFormComponent,
    ItemComponent,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MaterialCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
