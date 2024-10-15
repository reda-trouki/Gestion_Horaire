import { Enseignant } from "./Enseignant";
import { InterventionID } from "./InterventionID";
import { Module } from "./Module";

export interface Intervention {
	id:InterventionID;
	intitule: string;
  vhcourInterv: number;
  vhtdInterv: number;
  vhtpInterv: number;
  nbevalInterv: number;
  enseignant: Enseignant;
  module: Module;
}
