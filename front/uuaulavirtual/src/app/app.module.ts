import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { SithecSuiteModule } from './form-component/sithec-tools-suite.module';
import { SessionService } from './services/session.service';
import { AuthGuard } from './services/auth.guard';
import { HttpInterceptorService } from './services/http.interceptor';
import { UserService } from './services/user.service';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { SchoolService } from './services/school.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule} from '@angular/material/input';
import { LoginModule } from './components/login/login.module';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,/* Se declararán solo modulos compartidos de forma global*/
    NavbarComponent,
    FormDialogComponent,
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
    SithecSuiteModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LoginModule,
    CommonModule
  ],
  providers: [
    UserService,
    TeacherService,
    StudentService,
    SessionService,
    SchoolService,
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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
