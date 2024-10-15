import { Component } from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {User} from "../../../shared/models/User";
import {Observable} from "rxjs";
import {EnseignantesService} from "../../services/enseignantes.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-interventions',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './user-interventions.component.html',
  styleUrl: './user-interventions.component.css'
})
export class UserInterventionsComponent {
  private user : User;
  protected interventions : Observable<any>;

  constructor(private enseignantesService: EnseignantesService, private userService: UserService) {
    this.user = this.userService.getUser();
    this.interventions = this.enseignantesService.getUserInterventions(this.user.email);
    console.log(this.interventions);
  }

  get userInterventions(){
    return this.interventions;
  }
}
