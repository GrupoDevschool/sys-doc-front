import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { GlobalErrorHandler } from './core/error/global-error-handler';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MenuComponent } from './menu/menu.component';
import { MaterialCommonModule, MODULES } from './shared/module/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
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
    VersionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialCommonModule,
  ],
  exports: [
    ...MODULES
  ],
  providers: [
    AuthGuardService,
    LoginService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
