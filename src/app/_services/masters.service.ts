
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@/../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MastersService {

    baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	addLibrary(data){
		return this.http.post(`${this.baseUrl}masters/book`,data);
	}

	getAllLibrary(){
		return this.http.get(`${this.baseUrl}masters/book`);
	}
	
	getAllLendedLibrary(){
		return this.http.get(`${this.baseUrl}masters/book/lended`);
	}
	
	getAllNotLendedLibrary(){
		return this.http.get(`${this.baseUrl}masters/book/notlended`);
	}
	
	getActiveLibrary(){
		return this.http.get(`${this.baseUrl}registration/library/list`);
	}
	
	lendBook(id){
		return this.http.get(`${this.baseUrl}book/lend/${id}`);
	}
	
	notLendBook(id){
		return this.http.get(`${this.baseUrl}book/notlend/${id}`);
	}

	getLibrary(id){
		return this.http.get(`${this.baseUrl}masters/library/${id}`);
	}

	deleteLibrary(id){
		return this.http.get(`${this.baseUrl}book/delete/${id}`);
	}

	updateLibrary(id,formData){
			return this.http.post(`${this.baseUrl}book/update/${id}`,formData);
	}	
	getchartdata(){
			return this.http.get(`${this.baseUrl}masters/chart`);
	}

 }