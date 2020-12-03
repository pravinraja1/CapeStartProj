import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
/**Components*/
import { LoginComponent } from './index';
/**Additional Modules*/
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AngularMaterialModule } from '.././angular-material.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Additional Modules*/
    MaterialFileInputModule,
    AngularMaterialModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule { }
