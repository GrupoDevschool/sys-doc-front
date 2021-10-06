import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_ROUTES, LIST_ROUTES } from './components/configuration-routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login.component';

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
  ...FORM_ROUTES,
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
