import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Intervention } from '../../shared/models/Intervention';
import { InterventionID } from '../../shared/models/InterventionID';
@Injectable({
  providedIn: 'root'
})
export class InterventionsService {

    private url = 'http://localhost:8080/api/interventions';
    token: string | null = null;
      constructor(private http: HttpClient, private authService:AuthService) {
        this.token = this.authService.getAccessToken();
    }
    getInterventions(): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(this.url, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.token}`
        })});
    }
    getIntervention(id: number): Observable<Intervention> {
        return this.http.get<Intervention>(`${this.url}/${id}`);
    }
	add(intervention: any, enseignant_id: string, module_id: String): Observable<Intervention> {
		const params = new HttpParams()
			.set('idModule', module_id.toString())
			.set('idEnseignant', enseignant_id);

		return this.http.post<Intervention>(this.url, intervention, {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
			}),
			params: params
		});
	}
	update( Intervention: any, enseignant_id: string, module_id: String): Observable<Intervention> {
		const params = new HttpParams()
			.set('idModule', module_id.toString())
			.set('idEnseignant', enseignant_id);

		return this.http.put<Intervention>(this.url, Intervention, {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.token}`
			}),
			params: params
		});
	}
    delete(idEnseignant:string ,idModule:string ): any {
        return this.http.delete(`${this.url}/${idEnseignant}/${idModule}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.token}`
            }),
            responseType: 'text' as 'json'
        });
    }
    countInterventions(): Observable<any> {
      return this.http.get(`${this.url}/count`, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        }),
      });
    }
}
