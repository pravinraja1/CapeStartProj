import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TopNavComponent } from '@/global';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*Interceptors*/
import { JwtInterceptor } from '@/_services/jwt.interceptor';
import { ErrorInterceptor } from '@/_services/error.interceptor';
// Additional
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularMaterialModule } from './angular-material.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MainNavComponent } from './global/main-nav/main-nav.component';
import { NgxLoadingModule } from 'ngx-loading';
import { MastersModule } from '@/masters/masters.module';
import {LibraryModule} from './LibraryPublic/library.module';
import {MyBookModule} from './my-books/mybook.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
      TopNavComponent,
      DashboardComponent,
      MainNavComponent,
   ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoginModule,
    MastersModule,
    MatMenuModule,
    NgxLoadingModule.forRoot({}),
    LibraryModule,
    MyBookModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
