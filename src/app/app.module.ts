import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnlessDirective } from './directives/unless.directive';
import {
  LoginComponent,
  RegisterComponent,
  WorkerComponent,
  AdminComponent,
} from '@app/routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ScheduleTableComponent } from '@components/schedule-table/schedule-table.component';
import { NumericDateConverterPipe } from './pipes/numeric-date-converter.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StorageService } from '@app/services';
import { JobIdToTitlePipe } from './pipes/job-id-to-title.pipe';
import { RoleIdToTitlePipe } from './pipes/role-id-to-title.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './routes/admin/edit-user/edit-user.component';
import { ChangeRoleDialogComponent } from '@dialogs/change-role-dialog/change-role-dialog.component';
import { DeleteUserDialogComponent } from '@dialogs/delete-user-dialog/delete-user-dialog.component';
import { EditJobComponent } from './routes/admin/edit-job/edit-job.component';
import { AddJobDialogComponent } from './components/dialogs/add-job-dialog/add-job-dialog.component';
import { DeleteJobDialogComponent } from './components/dialogs/delete-job-dialog/delete-job-dialog.component';
import { EditScheduleComponent } from './routes/admin/edit-schedule/edit-schedule.component';
import { DeleteScheduleDialogComponent } from './components/dialogs/delete-schedule-dialog/delete-schedule-dialog.component';
import { ApproveScheduleDialogComponent } from './components/dialogs/approve-schedule-dialog/approve-schedule-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '@/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UnlessDirective,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    WorkerComponent,
    AdminComponent,
    EditUserComponent,
    ChangeRoleDialogComponent,
    DeleteUserDialogComponent,
    EditJobComponent,
    ScheduleTableComponent,
    AddJobDialogComponent,
    DeleteJobDialogComponent,
    EditScheduleComponent,
    DeleteScheduleDialogComponent,
    ApproveScheduleDialogComponent,
    LoadingSpinnerComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    DatePipe,
    RoleIdToTitlePipe,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    JobIdToTitlePipe,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    JsonPipe,
    MatButtonToggleModule,
    NumericDateConverterPipe,
    MatIcon,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideNativeDateAdapter(),
    StorageService,
  ],
})
export class AppModule { }
