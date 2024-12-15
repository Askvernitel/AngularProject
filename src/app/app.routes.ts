import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: undefined,
    loadComponent: () =>
      import('@app/app.component').then((value) => value.AppComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@routes/home/home.component').then(
        (value) => value.HomeComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@routes/login/login.component').then(
        (value) => value.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@routes/register/register.component').then(
        (value) => value.RegisterComponent,
      ),
  },
];
