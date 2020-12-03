
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
	horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(private _snackBar: MatSnackBar) {

	}

	errorSnackBar(msg) {
    	this._snackBar.open(msg, '', {
      		duration: 2000,
      		horizontalPosition: this.horizontalPosition,
      		verticalPosition: this.verticalPosition,
          panelClass: ['error-snackbar'],
    	});
	}
  successSnackBar(msg) {
      this._snackBar.open(msg, '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
      });
  }


 }