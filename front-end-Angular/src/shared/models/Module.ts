import { Enseignant } from "./Enseignant";
import { Filiere } from "./Filiere";
import { Intervention } from "./Intervention";

export interface Module {
    intitule: string;
    vhcour: number;
    vhtd: number;
    vhtp: number;
    nbeval: number;
    filiere: Filiere;
    enseignant: Enseignant;
    interventions: Intervention[];
}