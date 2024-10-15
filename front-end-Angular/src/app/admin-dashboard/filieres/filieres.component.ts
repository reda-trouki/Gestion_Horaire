import { Component, OnInit, ViewChild } from '@angular/core';
import { FilieresService } from '../../services/filieres.service';
import { Filiere } from '../../../shared/models/Filiere';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import {ConfirmationComponent} from "../../confirmation/confirmation.component";

@Component({
  selector: 'app-filieres',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationComponent],
  templateUrl: './filieres.component.html',
  styleUrl: './filieres.component.css'
})
export class FilieresComponent implements OnInit {
	showform:boolean = false;
	action :string ='Ajouter';
	filieres : Filiere[] =[];
	filiere!: Filiere;
	filiere_nom:string = '';
	validationError:boolean = false;
	validationMessage:string = '';
  showConfirmationModal= false;
  itemToDelete: any = null;
	constructor(private filieresService: FilieresService) {
		this.filieresService.getFilieres().subscribe(filieres => this.filieres = filieres);
	}
	ngOnInit(): void {
		initFlowbite();
	}
	ngAfterViewInit(): void {
		initFlowbite();
	}
	addFiliere() {
		//test if name is not empty and name is valid and not containing special characters
		if(this.filiere_nom == null || this.filiere_nom == '' || !/^[a-zA-Z0-9 ]+$/.test(this.filiere_nom)) {
			this.validationError = true;
			this.validationMessage = 'Nom de la filière invalide';
			return;
		}
		this.validationError = false;
		let fl={
			nom:this.filiere_nom
		};
		this.filieresService.addFiliere(fl).subscribe(filiere => {
			this.filieres.push(filiere);
			this.showform = false;
      this.validationMessage = 'filère ajoutée avec succès';
		}, error => {
			this.validationError = true;
			this.validationMessage = error.error;
		});
	}
	set_update(fl:Filiere){
		this.action = 'Modifier';
		this.filiere_nom = fl.nom;
		this.filiere = fl;
    this.validationMessage = '';
	}

	update(){
		if(this.filiere_nom == null || this.filiere_nom == '' || !/^[a-zA-Z0-9 ]+$/.test(this.filiere_nom)) {
			this.validationError = true;
			this.validationMessage = 'Nom de la filière invalide';
			return;
		}
		this.validationError = false;
		this.filiere.nom = this.filiere_nom;
		this.filieresService.updateFiliere(this.filiere).subscribe(filiere => {
			this.filieres = this.filieres.map(f => f.id == filiere.id ? filiere : f);
			this.showform = false;
      this.validationMessage = 'filère modifiée avec succès';
		}, error => {
			this.validationError = true;
			this.validationMessage = error.error;
		});

	}
	handleClick(){
		if (this.action==='Ajouter') {
			this.addFiliere()
		}
		else{
			this.update()
		}
	}
	deleteFiliere() {
		this.filieresService.deleteFiliere(this.itemToDelete).subscribe(() => {
			this.filieres = this.filieres.filter(f => f.id !=this.itemToDelete);
      this.validationMessage = 'filère supprimée avec succès';
      this.closeConfirmationModal();
		}, (error: { error: string; }) => {
      this.validationError = true;
      this.validationMessage = error.error;
      }
    );
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
