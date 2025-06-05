import{BLcommande} from '../model/blcommande';
export class BCommande {
    id :number;
    annee : number;
    numero : number;
    code_magasin : number;
    lib_magasin : string;
    date : any;
    libelle : String;
    totht : number;
    tottva : number;
    totttc : number;
    modepayement:string;
    mag:string;
    lcomms :Array<BLcommande> =[];
}