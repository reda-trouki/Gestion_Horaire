import { Component, OnInit, ViewChild } from '@angular/core';

import { Enseignant } from '../../../shared/models/Enseignant';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import {EnseignantesService} from "../../services/enseignantes.service";
import {User} from "../../../shared/models/User";
import {UserService} from "../../services/user.service";
import {ConfirmationComponent} from "../../confirmation/confirmation.component";

@Component({
  selector: 'app-enseignants',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationComponent],
  templateUrl: './enseignantes.component.html',
  styleUrl: './enseignantes.component.css',
})
export class EnseignantesComponent implements OnInit {
  showConfirmationModal = false;
  itemToDelete: any = null;
	showform:boolean = false;
	action :string ='Ajouter';
	enseignants : Enseignant[] =[];
	enseignant!: Enseignant;
	enseignant_nom:string = '';
	enseignant_prenom:string = '';
	enseignant_email:string = '';
	enseignant_password:string = '';
  old_ens_password= '';
	validationError:boolean = false;
	validationMessage:string = '';
  user: User = {} as User;
	constructor(private enseignantsService: EnseignantesService, private userService: UserService) {
		this.enseignantsService.getEnseignants().subscribe(enseignants => this.enseignants = enseignants);
    this.emailNotCurrentUser = this.emailNotCurrentUser.bind(this);
  }
	ngOnInit(): void {
		initFlowbite();
    this.user = this.userService.getUser();
	}
	ngAfterViewInit(): void {
		initFlowbite();
	}
  emailNotCurrentUser(enseignant: Enseignant) {
    return enseignant.email !== this.user.email;
  }
  get enseignantsList(){
    return this.enseignants.filter(this.emailNotCurrentUser);
  }
	addEnseignant() {
		//test if name is not empty and name is valid and not containing special characters
		if(this.enseignant_nom == null || this.enseignant_nom == '' || !/^[a-zA-Z0-9 ]+$/.test(this.enseignant_nom)) {
			this.validationError = true;
			this.validationMessage = 'Nom de l\'enseignant invalide';
			return;
		}
		this.validationError = false;
		let ens={
			nom:this.enseignant_nom,
			prenom:this.enseignant_prenom,
			email:this.enseignant_email,
			password:this.enseignant_password
		};
		this.enseignantsService.addEnseignant(ens).subscribe(enseignant => {
			this.enseignants.push(enseignant);
			this.showform = false;
      this.enseignant_nom = '';
      this.enseignant_prenom = '';
      this.enseignant_email = '';
      this.enseignant_password = '';

		}, error => {
			this.validationError = true;
			this.validationMessage = error.error;
		});
	}
	set_update(ens:Enseignant){
		this.action = 'Modifier';
		this.enseignant_nom = ens.nom;
		this.enseignant_prenom = ens.prenom;
		this.enseignant_email = ens.email;
    this.enseignant_password = '';
		this.old_ens_password= ens.password;
		this.enseignant = ens;
	}

	update(){
		if(this.enseignant_nom == null || this.enseignant_nom == '' || !/^[a-zA-Z0-9 ]+$/.test(this.enseignant_nom)) {
			this.validationError = true;
			this.validationMessage = 'Nom de l\'enseignant invalide';
			return;
		}
		this.validationError = false;
		this.enseignant.nom = this.enseignant_nom;
		this.enseignant.prenom = this.enseignant_prenom;
		this.enseignant.email = this.enseignant_email;
		this.enseignant.password = this.enseignant_password === '' ? this.old_ens_password : this.enseignant_password;

		this.enseignantsService.updateEnseignant(this.enseignant).subscribe(enseignant => {
			this.enseignants = this.enseignants.map(e => e.email == enseignant.email ? enseignant : e);
			this.showform = false;
		}, error => {
			this.validationError = true;
			this.validationMessage = error.error;
      console.log(error.error);
		});

	}
	handleClick(){
		if (this.action==='Ajouter') {
			this.addEnseignant()
		}
		else{
			this.update()
		}
	}
	deleteEnseignant() {
		this.enseignantsService.deleteEnseignant(this.itemToDelete).subscribe(() => {
			this.enseignants = this.enseignants.filter(e => e.email !=this.itemToDelete);
      this.closeConfirmationModal();
		});
	}

  openConfirmationModal(item: any) {
    this.showConfirmationModal = true;
    this.itemToDelete = item;
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
    this.itemToDelete = null;
  }
}
