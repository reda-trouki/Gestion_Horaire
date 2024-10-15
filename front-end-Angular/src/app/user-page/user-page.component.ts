import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  protected user: User;

  constructor(private userService: UserService) {
    this.user = userService.getUser();
  }



  logout(){
    this.userService.logout();
  }
}
