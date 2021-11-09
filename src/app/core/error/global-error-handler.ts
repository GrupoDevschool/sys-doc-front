import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from 'src/app/login/login.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private loginService: LoginService,
    private injector: Injector,
    private ngZone: NgZone,
  ) { }

  handleError(error: any) {
    this.ngZone.run(() => {
      if((error.status === 401 || error.status === 403) && error instanceof HttpErrorResponse) {
        this.toastrService.error("Seu token está expirado, faça login novamente", "Erro de autenticação");
        this.loginService.logout();
      }

      if(error instanceof HttpErrorResponse == false) {
        console.log('error:', error);
      }
    });
  }

  get router(): Router {
    return this.injector.get(Router);
  };

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }
}
