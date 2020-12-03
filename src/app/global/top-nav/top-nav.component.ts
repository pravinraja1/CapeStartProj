import { Component, OnInit } from '@angular/core';

import { ChangeSideNavService } from '@/_services/change-sidenav.service';
import { UserLoginService } from '@/_services/user-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@/_helpers'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  public loginUserName:any;
  
  constructor(private changeSideNavService: ChangeSideNavService,
  	private userLoginService: UserLoginService,
    private alertService:AlertService,
    private router: Router
  	) {}

  ngOnInit(): void {
    this.userLoginService.currentUser.subscribe(x =>this.loginUserName=x);
  }

   logout(){
    this.userLoginService.logout();
    this.alertService.errorSnackBar('Logged Out Successfully');
    this.router.navigate(["#"]);
  }
}
