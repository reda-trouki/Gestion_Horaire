import { Component } from '@angular/core';
import { ModulesService } from '../../services/modules.service';
import { Module } from '../../../shared/models/Module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Enseignant } from '../../../shared/models/Enseignant';
import { EnseignantesService } from '../../services/enseignantes.service';
import { Intervention } from '../../../shared/models/Intervention';
import { InterventionsService } from '../../services/interventions.service';
import { InterventionID } from '../../../shared/models/InterventionID';
import {ConfirmationComponent} from "../../confirmation/confirmation.component";
@Component({
  selector: 'app-interventions',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationComponent],
  templateUrl: './interventions.component.html',
  styleUrl: './interventions.component.css'
})


export class InterventionsComponent {
	constructor(private moduleService: ModulesService, private ensiegnantesService: EnseignantesService,private interventionsService: InterventionsService) {
		this.moduleService.getModules().subscribe(modules => {
			this.modules = modules;
  		});
		this.ensiegnantesService.getEnseignants().subscribe(
			enseignants => {
				this.ensiegnants = enseignants
			}
		);
		this.interventionsService.getInterventions().subscribe(
			interventions => {
				this.interventions = interventions;
				// console.log(interventions);
			}
		);
	}
	ensiegnants: Enseignant[] = [];
	modules: Module[] = [];
	interventions: Intervention[] = [];
	//for CRUD
	enseignant_id:string = '';
	module_id:String = '';
	intervention:any={
		intitule: '',
		vhcourInterv: 0,
		vhtdInterv: 0,
		vhtpInterv: 0,
		nbevalInterv: 0,
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
		if (this.intervention.intitule==='') {
			this.validationError = true;
			this.validationMessage = 'Intitulé est obligatoire';
			return false;
		}
		if (this.intervention.vhcour===0) {
			this.validationError = true;
			this.validationMessage = 'VHcour est obligatoire';
			return false;
		}
		if (this.intervention.vhtd===0) {
			this.validationError = true;
			this.validationMessage = 'VHtd est obligatoire';
			return false;
		}
		if (this.intervention.vhtp===0) {
			this.validationError = true;
			this.validationMessage = 'VHtp est obligatoire';
			return false;
		}
		if (this.intervention.nbeval===0) {
			this.validationError = true;
			this.validationMessage = 'NBeval est obligatoire';
			return false;
		}
		if (this.enseignant_id==='') {
			this.validationError = true;
			this.validationMessage = 'Enseignant est obligatoire';
			return false;
		}
		if (this.module_id==='') {
			this.validationError = true;
			this.validationMessage = 'Module est obligatoire';
			return false;
		}
		return true;
	}
	add(){
		console.log(this.intervention);
		this.interventionsService.add(this.intervention,this.enseignant_id,this.module_id).subscribe(
			interv => {
				this.interventions.push(interv);
				this.showForm = false;
				this.validationError = false;
				this.intervention={
					intitule: '',
					vhcourInterv: 0,
					vvhtdInterv: 0,
					vhtpInterv: 0,
					nbevalInterv: 0,
				}
			},
			error=>{
				this.validationError = true;
				this.validationMessage = error.error;

			}
		);
	}
	set_update(interv:Intervention,){
		this.action = 'Modifier';

		this.intervention.intitule = interv.intitule;
		this.intervention.vhcourInterv = interv.vhcourInterv;
		this.intervention.vhtdInterv = interv.vhtdInterv;
		this.intervention.vhtpInterv = interv.vhtpInterv;
		this.intervention.nbevalInterv = interv.nbevalInterv;
		this.intervention.id=interv.id;

		this.enseignant_id = interv.enseignant.email;
		this.module_id = interv.module.intitule as unknown as string;

	}
	update(){
		this.interventionsService.update( this.intervention,this.enseignant_id,this.module_id).subscribe(
			interv => {
				this.interventions = this.interventions.map(m => {
					if (m.id.enseignantID ===interv.id.enseignantID && m.id.moduleID ===interv.id.moduleID) {
						return interv;
					}
					return m;
				});
				this.showForm = false;
				this.validationError = false;
				this.intervention={
					intitule: '',
					vhcourInterv: 0,
					vhtdInterv: 0,
					vhtpInterv: 0,
					nbevalInterv: 0,
				};
				this.enseignant_id = '';
				this.module_id = '';
				this.action = 'Ajouter';
			},
			error=>{
				this.validationError = true;
				this.validationMessage = error.error;

			}
		);

	}
	deleteIntervention() {
		this.interventionsService.delete(this.itemToDelete.enseignantID,this.itemToDelete.moduleID).subscribe(
			() => {
			this.interventions = this.interventions.filter(m => m.id !=this.itemToDelete);
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
