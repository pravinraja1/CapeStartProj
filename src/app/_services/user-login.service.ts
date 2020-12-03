
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@/../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

    baseUrl = environment.apiUrl;

    private currentUserSubject: BehaviorSubject<any>;
  	public currentUser: Observable<any>;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem('currentUser'));
	    this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue() {
        return this.currentUserSubject.value;
	}

	public currentSetUserValue(user) {
        this.currentUserSubject.next(user);
	}

	logout() {
        // remove user from local storage and set current user to null
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
	}

	login( data ) {
	  return this.http.post(`${this.baseUrl}get-token`, data);
	}

	createUser( data ) {
	  return this.http.post(`${this.baseUrl}user`, data);
	}

	getOne(id){
		return this.http.get(`${this.baseUrl}details/${id}`);
	}

	genOtp(data){
		return this.http.post(`${this.baseUrl}otp`,data);
	}

	verifyOtp(data){
		return this.http.post(`${this.baseUrl}verify-otp`,data);
	}

	updatePassword(data){
		return this.http.post(`${this.baseUrl}password`,data);
	}


 }