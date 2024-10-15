import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Module } from '../../shared/models/Module';
import { Observable } from 'rxjs';
import { Filiere } from '../../shared/models/Filiere';
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
    private url = 'http://localhost:8080/api/modules';
    token: string | null = null;
      constructor(private http: HttpClient, private authService:AuthService) {
        this.token = this.authService.getAccessToken();
    }
    getModules(): Observable<Module[]> {
        return this.http.get<Module[]>(this.url, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.token}`
        })});
    }
    getModule(id: number): Observable<Module> {
        return this.http.get<Module>(`${this.url}/${id}`);
    }
	add(module: any, enseignant_id: string, filiere_id: number): Observable<Module> {
		const params = new HttpParams()
			.set('idFiliere', filiere_id.toString())
			.set('idEnseignant', enseignant_id);

		return this.http.post<Module>(this.url, module, {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
			}),
			params: params
		});
	}
	updateModule( module: any, enseignant_id: string, filiere_id: number): Observable<Module> {
    if (filiere_id === undefined || enseignant_id === undefined) {
      throw new Error('filiere_id or enseignant_id is undefined');
    }
		const params = new HttpParams()
			.set('idFiliere', filiere_id.toString())
			.set('idEnseignant', enseignant_id);

		return this.http.put<Module>(this.url, module, {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
			}),
			params: params
		});
	}

    delete(id: string): any {
        return this.http.delete(`${this.url}/${id}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.token}`
            }),
            responseType: 'text' as 'json'
        });
    }
    countModules(): Observable<any> {
      return this.http.get(`${this.url}/count`, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        }),
      });
    }


}
