import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | undefined;
  private refreshToken: string | undefined;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  url= 'http://localhost:8080';

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string; refreshToken: string }>(`${this.url}/api/auth/authenticate`, credentials).subscribe(
      (response) => {
        this.accessToken = response.token;
        this.refreshToken = response.refreshToken;
        // Store tokens in local storage or other storage
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);
        this.getUserDetails(response.token);
      }
    );
  }
  refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ token: string }>('/api/refresh-token', { refreshToken }).subscribe(
      (response) => {
        this.accessToken = response.token;
        localStorage.setItem('accessToken', this.accessToken);

      }
    );
  }

  private getUserDetails(accessToken: string) {
    this.userService.getUserDetails().subscribe(
      (user) => {
        console.log(user.role)

        this.userService.setCurrentUser(user);
        if(user.role == 'ADMIN') {
          this.router.navigate(['admin-dashboard']);
        }else{
          this.router.navigate(['user-page']);
        }
      },
      (error) => {
        console.error('Error retrieving user details:', error);
        // Handle error
      }
    );
  }

  getAccessToken(): string | null {
    if (this.accessToken) {
      return this.accessToken;
    }
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.accessToken = accessToken;
      return accessToken;
    }
    return null;
  }

  getAuthorizationHeader() {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
  }

}
