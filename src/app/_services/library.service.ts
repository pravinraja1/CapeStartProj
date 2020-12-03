
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@/../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LibraryService {

    baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	addAuthor(data){
		return this.http.post(`${this.baseUrl}category/author`,data);
	}
	addPublisher(data){
		return this.http.post(`${this.baseUrl}category/publisher`,data);
	}
	findAllAuthor(){
		return this.http.get(`${this.baseUrl}getauthor`);
	}
	findALLPublisher(){
		return this.http.get(`${this.baseUrl}getpublisher`);
	}

 }