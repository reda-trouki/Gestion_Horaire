import { Component } from '@angular/core';
import { ModulesService } from '../../services/modules.service';
import { Module } from '../../../shared/models/Module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Enseignant } from '../../../shared/models/Enseignant';
import { EnseignantesService } from '../../services/enseignantes.service';
import { Filiere } from '../../../shared/models/Filiere';
import { FilieresService } from '../../services/filieres.service';
import {ConfirmationComponent} from "../../confirmation/confirmation.component";


@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationComponent],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
	constructor(private moduleService: ModulesService, private ensiegnantesService: EnseignantesService,private filieresService: FilieresService) {
		this.moduleService.getModules().subscribe(modules => {
      this.modules = modules;
    //   console.log(this.modules);
  });

		this.ensiegnantesService.getEnseignants().subscribe(
			enseignants => {
				this.ensiegnants = enseignants
			}
		);
		this.filieresService.getFilieres().subscribe(
			filieres => {
				this.filieres = filieres
			}
		);
	}
	ensiegnants: Enseignant[] = [];
	filieres: Filiere[] = [];
	modules: Module[] = [];

	//for CRUD
	enseignant_id:string = '';
	filiere_id:number = -1;
	module:any={
		intitule:'',
		vhcour:0,
		vhtd:0,
		vhtp:0,
		nbeval:0,
	}


	showForm: boolean = false;
	action: string = 'Ajouter';
	validationError: boolean = false;
	validationMessage: string = '';
  showConfirmationModal = false;
  itemToDelete: any = null;
	handleClick(){
		this.validate();
		if (this.action==='Ajouter') {
			this.add();
		}
		else{
			this.update()
		}
	}
	validate(){
		if (this.module.intitule==='') {
			this.validationError = true;
			this.validationMessage = 'Intitulé est obligatoire';
			return false;
		}
		if (this.module.vhcour===0) {
			this.validationError = true;
			this.validationMessage = 'VHcour est obligatoire';
			return false;
		}
		if (this.module.vhtd===0) {
			this.validationError = true;
			this.validationMessage = 'VHtd est obligatoire';
			return false;
		}
		if (this.module.vhtp===0) {
			this.validationError = true;
			this.validationMessage = 'VHtp est obligatoire';
			return false;
		}
		if (this.module.nbeval===0) {
			this.validationError = true;
			this.validationMessage = 'NBeval est obligatoire';
			return false;
		}
		if (this.enseignant_id==='') {
			this.validationError = true;
			this.validationMessage = 'Enseignant est obligatoire';
			return false;
		}
		if (this.filiere_id===-1) {
			this.validationError = true;
			this.validationMessage = 'Filiere est obligatoire';
			return false;
		}
		return true;
	}
	add(){
		this.moduleService.add(this.module,this.enseignant_id,this.filiere_id).subscribe(
			module => {
				this.modules.push(module);
				this.showForm = false;
				this.validationError = false;
				this.module={
					intitule:'',
					vhcour:0,
					vhtd:0,
					vhtp:0,
					nbeval:0,
				}
			},
			error=>{
				this.validationError = true;
				this.validationMessage = error.error;

			}
		);
	}
	set_update(module:Module){
		this.action = 'Modifier';

		this.module.intitule = module.intitule;
		this.module.vhcour = module.vhcour;
		this.module.vhtd = module.vhtd;
		this.module.vhtp = module.vhtp;
		this.module.nbeval = module.nbeval;

		this.enseignant_id = module.enseignant.email;
		this.filiere_id = module.filiere.id;

	}
	update(){
		this.moduleService.updateModule( this.module,this.enseignant_id,this.filiere_id).subscribe(
			module => {
				this.modules = this.modules.map(m => {
					if (m.intitule ===module.intitule) {
						return module;
					}
					return m;
				});
				this.showForm = false;
				this.validationError = false;
				this.module={
					intitule:'',
					vhcour:0,
					vhtd:0,
					vhtp:0,
					nbeval:0,
				};
				this.enseignant_id = '';
				this.filiere_id = -1;
				this.action = 'Ajouter';
			},
			error=>{
				this.validationError = true;
				this.validationMessage = error.error;

			}
		);

	}
	deleteModule() {
		this.moduleService.delete(this.itemToDelete).subscribe(
			() => {
			this.modules = this.modules.filter(m => m.intitule !=this.itemToDelete);
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
