import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
/**Components*/
import { LibraryBooksComponent,ViewBookComponent} from './index';
/**Additional Modules*/
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AngularMaterialModule } from '../angular-material.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes  } from 'ngx-loading';
import { NumberOnlyDirectiveModule } from '@/_directives';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*Additional Modules*/
    MaterialFileInputModule,
    AngularMaterialModule,
    NumberOnlyDirectiveModule,
    LazyLoadImageModule,
    NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.threeBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.4)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
    })
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  declarations: [
    LibraryBooksComponent,
    ViewBookComponent,
  ]
})
export class LibraryModule { }
