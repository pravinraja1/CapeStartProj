
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '@/_helpers';

import { UserLoginService } from '@/_services/user-login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userLoginService: UserLoginService,
     private alertService:AlertService,
     private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.userLoginService.logout();
                this.alertService.errorSnackBar('Please Login to Continue!!!');
                this.router.navigate(["/login"]);
            }else if (err.status === 500){
                this.alertService.errorSnackBar(err.error.message);
            }else if (err.status === 404){
                this.alertService.errorSnackBar('404 Page Not Found!!!');
            }else if (err.status === 501){
                this.alertService.errorSnackBar(err.error.message);
            }
            return throwError(err);
        }))
    }
}