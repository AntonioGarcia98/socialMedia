import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from './services/session.service';
import { AuthGuard } from './services/auth.guard';
import { HttpInterceptorService } from './services/http.interceptor';
import { UserService } from './services/user.service';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule} from '@angular/material/input';
import { LoginModule } from './components/login/login.module';
import { CommonModule } from '@angular/common';
import { FormErrorsModule } from './components/form-errors/form-errors.module';
import { CreateAccountModule } from './components/create-account/create-account.module';





@NgModule({
  declarations: [
    AppComponent,/* Se declararán solo modulos compartidos de forma global*/
    NavbarComponent,
    MessageDialogComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LoginModule,
    CreateAccountModule,
    CommonModule,

  ],
  providers: [
    UserService,
    SessionService,
    LoaderService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: null
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
