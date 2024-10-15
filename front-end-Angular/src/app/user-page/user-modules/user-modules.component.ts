import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Module} from "../../../shared/models/Module";
import {User} from "../../../shared/models/User";
import {UserService} from "../../services/user.service";
import {EnseignantesService} from "../../services/enseignantes.service";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-modules',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-modules.component.html',
  styleUrl: './user-modules.component.css'
})
export class UserModulesComponent {
  private user : User;
  protected modules : Observable<any>;

  constructor(private enseignantesService: EnseignantesService, private userService: UserService) {
    this.user = this.userService.getUser();
    this.modules = this.enseignantesService.getUserModules(this.user.email);
  }

  get userModules(){
    return this.modules;
  }

}
