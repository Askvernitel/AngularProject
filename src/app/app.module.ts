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
import {
  ToWeekdayPipe,
  ToMonthPipe,
  JobToTitlePipe,
  RoleToTitlePipe,
} from '@app/pipes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StorageService } from '@app/services';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from '@routes/admin/edit-user/edit-user.component';
import { ChangeRoleDialogComponent } from '@dialogs/change-role-dialog/change-role-dialog.component';
import { DeleteUserDialogComponent } from '@dialogs/delete-user-dialog/delete-user-dialog.component';
import { EditJobComponent } from '@routes/admin/edit-job/edit-job.component';
import { AddJobDialogComponent } from '@dialogs/add-job-dialog/add-job-dialog.component';
import { DeleteJobDialogComponent } from '@dialogs/delete-job-dialog/delete-job-dialog.component';
import { EditScheduleComponent } from '@routes/admin/edit-schedule/edit-schedule.component';
import { DeleteScheduleDialogComponent } from '@dialogs/delete-schedule-dialog/delete-schedule-dialog.component';
import { ApproveScheduleDialogComponent } from '@dialogs/approve-schedule-dialog/approve-schedule-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bars/snack-bar/snack-bar.component';
import { UserSearchBarComponent } from './components/search-bar/user-search-bar/user-search-bar.component';
/**
 * Function to load translations from the assets folder
 * @param http {HttpClient} - Angular HTTP client
 * @return TranslateHttpLoader - Angular translation loader
 */
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
    SnackBarComponent,
    UserSearchBarComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    DatePipe,
    RoleToTitlePipe,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    JobToTitlePipe,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    JsonPipe,
    MatButtonToggleModule,
    ToMonthPipe,
    ToWeekdayPipe,
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
