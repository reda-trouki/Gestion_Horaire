import { Role } from "./Role";

export interface Enseignant{
	email: string;
  nom: string;
  prenom: string;
  password: string;
	role: Role;
}
