import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './core/error/global-error-handler';
import { HomeModule } from './home/home.module';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MensagemComponent } from './shared/components/mensagem/mensagem.component';
import { MaterialCommonModule, MODULES } from './shared/module/material.module';
import { SpinnerButtonComponent } from './shared/components/spinner-button/spinner-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MensagemComponent,
    SpinnerButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    BrowserAnimationsModule,
    MaterialCommonModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      progressBar: true,
    })
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
