import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { FORM_ROUTES, LIST_ROUTES } from './components/configuration-routes';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  ...LIST_ROUTES,
  ...FORM_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
