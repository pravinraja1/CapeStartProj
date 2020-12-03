import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@/_helpers';

import { UserLoginService } from '@/_services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public key:any;
  //Screen  FLag
  newUser=false;
  existingUser=true;
  //form FLag
  Loginform: FormGroup;

  Regform: FormGroup;
  //URL
  returnUrl: string;
  //temp
  hide =false;
  hide1 =false;
  hide2=false;
  error:any;


  constructor(private _routes:ActivatedRoute,
     private fb: FormBuilder,
     private userLoginService: UserLoginService,
     private formBuilder: FormBuilder,
     private alertService:AlertService,
     private route: ActivatedRoute,
     private router: Router) {
      this.Loginform =new FormGroup({
          'email' : new FormControl('', [Validators.required,Validators.email]),
          'password' : new FormControl('', [Validators.required]),
      });
      this.Regform =new FormGroup({
          'first_name' : new FormControl('', [Validators.required]),
          'last_name' : new FormControl('', [Validators.required]),
          'email' : new FormControl('', [Validators.required,Validators.email]),
          'mobile_number' : new FormControl('', [Validators.required]),
          'city' : new FormControl('', [Validators.required]),
          'pin_code' : new FormControl('', [Validators.required]),
          'address' : new FormControl('', [Validators.required]),
          'password' : new FormControl('', [Validators.required]),
          'confirmpassword' : new FormControl('', [Validators.required]),
      });
  }

  ngOnInit(): void {
    this._routes.params.subscribe(params=>{this.signInOrSignUp(params['key'])});
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  signInOrSignUp(key){
    this.key=key==null?"signIn":key;
    if(this.key=="signIn"){
       this.signIn()
    }else if(this.key=="signUp"){
       this.signUp()
    }else if(this.key=="logout"){
      this.logout()
    }else{
      this.signIn()
    }
  }

  signIn(){
  	this.existingUser=true;
  	this.newUser=false;
  }

  signUp(){
  	this.existingUser=false;
  	this.newUser=true;
  }


  login(){
     if (this.Loginform.invalid) {
      this.alertService.errorSnackBar('username and password required');
      return;
    }this.userLoginService.login(this.Loginform.value)
     .subscribe((res:any)=>{
          if (res.status==false){
            this.alertService.errorSnackBar("Invalid username or password");
          }else{
            console.log(res);
            sessionStorage.setItem('currentUser',JSON.stringify(res));
            this.router.navigate([this.returnUrl]);
            this.alertService.successSnackBar("login Successfully");
            this.userLoginService.currentSetUserValue(res);
          }
    });
  }

  logout() {
        // remove user from local storage and set current user to null
        this.userLoginService.logout();
        this.alertService.successSnackBar("logged out Successfully");
  }

  createUser(){
    if (this.Regform.invalid) {
      this.alertService.errorSnackBar('Please fill All Required fields!');
      return;
    }
    if(this.Regform.controls["password"].value!=this.Regform.controls["confirmpassword"].value){
      this.alertService.errorSnackBar('Password confirmation does not match!');
      return;
    }
    this.userLoginService.createUser(this.Regform.value)
    .subscribe(res=>{
      this.alertService.successSnackBar("Created Successfully");
      location.reload(true);
    });
  }

}
