import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent, HomeComponent, LoginComponent, RegisterComponent, WorkerComponent } from "@app/routes";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "login",
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'worker',
    component: WorkerComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
