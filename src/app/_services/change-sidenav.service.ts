
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChangeSideNavService {
    private sideNavSubject: BehaviorSubject<any>;
    public sideNav: Observable<any>;

	constructor() {
		this.sideNavSubject = new BehaviorSubject<any>("close");
		this.sideNav = this.sideNavSubject.asObservable();
	}

	changeSideNav(status) {
		alert("called");
		this.sideNavSubject.next(status);
	}


 }