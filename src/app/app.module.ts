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
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  WorkerComponent,
  AdminComponent,
} from '@app/routes';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ScheduleTableComponent } from '@components/schedule-table/schedule-table.component';
import { NumericDateConverterPipe } from './pipes/numeric-date-converter.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StorageService } from '@app/services';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '@/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UnlessDirective,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    WorkerComponent,
    AdminComponent,
    ScheduleTableComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    JsonPipe,
    MatButtonToggleModule,
    NumericDateConverterPipe,
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
export class AppModule {}
