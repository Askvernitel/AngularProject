import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnlessDirective } from './directives/unless.directive';
import { HomeComponent, LoginComponent, RegisterComponent, WorkerComponent, AdminComponent } from '@app/routes';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { JsonPipe } from '@angular/common';

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
    AdminComponent
  ],
  bootstrap: [AppComponent], imports: [BrowserModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    JsonPipe,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
