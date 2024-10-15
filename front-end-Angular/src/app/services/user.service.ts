import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../shared/models/User";
import {routes} from "../app.routes";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUserRole(): string | null {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser ? currentUser.role : null; // Assuming the first role is the primary role
  }

  getUserDetails(): Observable<User> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<User>(`${this.url}/api/Enseignants`, { headers });
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  getUser(): User{
    return <User>this.currentUserSubject.getValue();

  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    this.http.get(`${this.url}/api/auth/logout`,{ headers}).subscribe(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/login']); // navigate to login page
    });
  }
  updateUser(updatedUser: User){
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.put<User>(`${this.url}/api/Enseignants/update`, updatedUser, { headers, responseType: 'text' as 'json' }).pipe(
      tap(() => {
        this.setCurrentUser(updatedUser);
        this.currentUserSubject.next(updatedUser);
      })
    );
  }
}
