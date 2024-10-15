import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/models/User";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EnseignantesService} from "../../services/enseignantes.service";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  profileForm: FormGroup = {} as FormGroup;
  validationError:boolean = false;
  validationMessage:string = '';

  constructor(private userService: UserService, private fb: FormBuilder, private enseignantServiec: EnseignantesService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.profileForm = this.fb.group({
      nom: [this.user.nom],
      prenom: [this.user.prenom],
      email: [this.user.email],
      password: [''],
    });
  }
  onSubmit(): void {
    if(this.profileForm.value.nom == null || this.profileForm.value.nom == '' || !/^[a-zA-Z0-9 ]+$/.test(this.profileForm.value.nom)) {
      this.validationError = true;
      this.validationMessage = 'Nom de l\'enseignant invalide';
      return;
    }
    this.validationError = false;
    const updatedUser = {
      ...this.user,
      ...this.profileForm.value
    };
    // If password is blank, keep the old password
    if (this.profileForm.value.password === '') {
      updatedUser.password = this.user.password;
    }
    updatedUser.role = this.user.role;
    this.userService.updateUser(updatedUser).subscribe(user => {
      this.user = user;
      this.validationMessage = 'Information updated successfully';
    }, error => {
      this.validationError = true;
      this.validationMessage = 'An error occurred: ' + error.error;
      console.log(error.error);
    });
  }
}
