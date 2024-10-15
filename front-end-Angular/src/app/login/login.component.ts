import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected email = '';
  protected password = '';
  authentication = false
  constructor(private authService : AuthService) {
  }
  authenticate() {
    this.authService.login({email: this.email, password: this.password});
    this.authentication = true;
  }
}
