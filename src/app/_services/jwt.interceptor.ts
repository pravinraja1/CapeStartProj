
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserLoginService } from '@/_services/user-login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userLoginService: UserLoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = sessionStorage.getItem('currentUser')==null?null:JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}