import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from 'src/app/login/login.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private ngZone: NgZone,
    public loginService: LoginService,
  ) { }

  handleError(error: any) {
    this.ngZone.run(() => {
      if(error.status == 401 && error instanceof HttpErrorResponse) {
        this.loginService.logout();
      }
    });

    if(error instanceof HttpErrorResponse == false)
      console.log('error:', error);
  }

  get router(): Router {
    return this.injector.get(Router);
  };

}
