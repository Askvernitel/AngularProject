import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import {
  AdminComponent,
  LoginComponent,
  RegisterComponent,
  WorkerComponent,
} from '@app/routes';
import { EditUserComponent } from '@routes/admin/edit-user/edit-user.component';
import { EditJobComponent } from '@routes/admin/edit-job/edit-job.component';
import { adminGuard } from './guards/admin.guard';
import { workerGuard } from './guards/worker.guard';
import { loginAndRegisterGuard } from './guards/login-and-register.guard';
import { EditScheduleComponent } from '@routes/admin/edit-schedule/edit-schedule.component';

/**
 * Application routes
 * @constant
 * @type {Routes}
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginAndRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginAndRegisterGuard],
  },
  {
    path: 'worker',
    component: WorkerComponent,
    canActivate: [workerGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'edit-user',
        component: EditUserComponent,
      },
      {
        path: 'edit-job',
        component: EditJobComponent,
      },
      {
        path: 'edit-schedule',
        component: EditScheduleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
