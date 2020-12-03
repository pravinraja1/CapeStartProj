import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserLoginService } from '@/_services/user-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@/_helpers'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public loginUserName:any;
  appAccess:any;
  constructor(private breakpointObserver: BreakpointObserver,
  	private userLoginService: UserLoginService,
    private alertService:AlertService,
    private router: Router) {}


  ngOnInit(): void {
    this.userLoginService.currentUser.subscribe(x =>this.loginUserName=x);
    this.appAccess = sessionStorage.getItem('currentUser')==null?null:JSON.parse(sessionStorage.getItem('currentUser')).role;
  }

   logout(){
    this.userLoginService.logout();
    this.alertService.errorSnackBar('Logged Out Successfully');
    this.router.navigate(["/login"]);
  }

}
