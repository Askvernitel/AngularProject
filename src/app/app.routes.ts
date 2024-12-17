import { Routes } from '@angular/router';
import { HomeComponent, LoginComponent, RegisterComponent } from '@app/routes';
import { AppComponent } from '@app/app.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "home",
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: "home",
  }
];
