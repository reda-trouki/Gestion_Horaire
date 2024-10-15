import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enseignant } from '../../shared/models/Enseignant';
import {AuthService} from "./auth/auth.service";
import { Module } from '../../shared/models/Module';
import {Intervention} from "../../shared/models/Intervention";

@Injectable({
  providedIn: 'root'
})
export class EnseignantesService {
	private apiUrl = 'http://localhost:8080/api/Enseignants'; // replace with your API endpoint
	private token: string | null = null;
	constructor(private http: HttpClient, private authService:AuthService) {
		this.token = this.authService.getAccessToken();
	}

	getEnseignants(): Observable<Enseignant[]> {
	  return this.http.get<Enseignant[]>(this.apiUrl+"/all",{
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
		})});
	}

  addEnseignant(ens: { password: string; nom: string; prenom: string; email: string }): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.apiUrl + "/add", ens, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
  updateEnseignant(ens: Enseignant): Observable<Enseignant> {
    return this.http.put<Enseignant>(this.apiUrl + "/update", ens, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
      responseType: 'text' as 'json'
      });
  }
  deleteEnseignant(id: string): any {
    return this.http.delete(this.apiUrl + "/delete/" + id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
      responseType: 'text' as 'json'
    });
  }
  countEnseignants(): Observable<any> {
    return this.http.get(this.apiUrl + "/count", {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
    });
  }
  getUserModules(email: string): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl + "/" + email + "/modules", {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
    });
  }
  getUserInterventions(email: string): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.apiUrl + "/" + email + "/interventions", {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
    });
  }
}
