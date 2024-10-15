import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Filiere } from '../../shared/models/Filiere';
import { Observable } from 'rxjs';
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FilieresService {
	private url = 'http://localhost:8080/api/filieres';
	token: string | null = null;
  	constructor(private http: HttpClient, private authService:AuthService) {
		this.token = this.authService.getAccessToken();
	}
	getFilieres(): Observable<Filiere[]> {
		return this.http.get<Filiere[]>(this.url, {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
		})});
	}
	getFiliere(id: number): Observable<Filiere> {
		return this.http.get<Filiere>(`${this.url}/${id}`);
	}
	addFiliere(filiere: {nom:string}): Observable<Filiere> {
		return this.http.post<Filiere>(this.url, filiere,{
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
		})});

	}
	updateFiliere(filiere: Filiere): Observable<Filiere> {
		return this.http.put<Filiere>(`${this.url}`, filiere,{
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
			}),
			responseType: 'text' as 'json'
		});
	}
	deleteFiliere(id: number): any {
		return this.http.delete(`${this.url}/${id}`, {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
			}),
			responseType: 'text' as 'json'
		});
	}
  countFilieres(): Observable<any> {
    return this.http.get(`${this.url}/count`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
    });
  }

  getModulesTotalHoursByFiliere(id: number) : Observable<any> {
    return this.http.get(`${this.url}/${id}/modules/total-hours`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
    });
  }
}
