import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { CompteurService } from 'src/app/services/compteur.service';
import { Client } from 'src/app/model/client';
import { Compteur} from 'src/app/model/compteur';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Commande } from 'src/app/model/commande';
import { CommandeService } from 'src/app/services/commande.service';
import { LcommandeService} from 'src/app/services/lcommande.service';
import { DatePipe } from '@angular/common';
import { AddLcommandeComponent } from '../add-lcommande/add-lcommande.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Observable } from "rxjs";
import { Article} from 'src/app/model/article';
import pdfMake from 'pdfmake/build/pdfmake';
import {map} from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Lcommande} from 'src/app/model/lcommande';
import { formatDate } from '@angular/common';
import '@angular/localize/init';
import { MagasinService } from 'src/app/services/magasin.service';
@Component({
  selector: 'app-addcommande',
  templateUrl: './addcommande.component.html',
  styleUrls: ['./addcommande.component.scss']
})
export class AddcommandeComponent  implements OnInit {
  ClientList: Client[];
  print:number=0;
  isValid:boolean = true;
  valider:boolean = false;
  articleService: any;
  Date;
  compteur : any={};
  client   : any= {};
  annee  = 0;
  public local;
  tauxusd = JSON.parse(localStorage.getItem('taux')).taux; 
  ttva= 0;
  ttc:number;
  tht:number;
  mt:number;
  mat;
  reste:number;
  credit:boolean= false;
  isentreprise= false;
  isSite=false;
  dette = false;
  public magasins;
  private facture;
  complefac;
  public monaie = "cdf";
  constructor(public service:CommandeService,
    public compteurservice:CompteurService,
    public lcommservice:LcommandeService,
    private dialog:MatDialog,public fb: FormBuilder,
    public clientService :ClientService,
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe,private magasinService:MagasinService) { }
    get f() { return this.service.formData.controls }
   
ngOnInit() {
  
    this.getMagasin();
   if (this.service.choixmenu == "A"){
    this.InfoForm();
    this.service.list = [];
    this.Date = this.transformDate(new Date(Date.now()));
    this.annee = (this.Date).toString().substring(0,4);
    this.f['annee'].setValue(this.annee);
    this.f['date'].setValue(this.Date);
    this.f['mag'].setValue(localStorage.getItem('magasin'));
    this.f['idUtilisateur'].setValue(localStorage.getItem('userid'));
    this.onSelectCompteur(this.annee);
    }
      else
    {
    //this.service.getData(this.service.formData.value.id).subscribe(res=> {
   // this.service.formData =this.fb.group(Object.assign({},res));
   // });
    this.complefac = localStorage.getItem('magasin').replace(/[aeiouyAEIOUY]/g,"").toUpperCase()+new Date().getTime();
    this.lcommservice.getAll(this.service.formData.value.numero).subscribe(
     response =>{
       this.service.list = response ;
       console.log(this.service.list);
      }
     );
     this.f['date'].setValue(this.service.formData.value.date_comm);
     this.f['mag'].setValue(localStorage.getItem('magasin'));
    }

 this.clientService.getAll().subscribe(
  response =>{this.ClientList = response;}
 );
  }

onSelectCompteur(id: number)
 {
  this.complefac = new Date().getMonth()+new Date().getDay().toLocaleString()+new Date().getHours().toLocaleString()+new Date().getMilliseconds() +localStorage.getItem('magasin').replace(/[aeiouyAEIOUY]/g,"").toUpperCase();
 
      this.f['numero'].setValue("FA "+this.annee + this.complefac );  
 } 
   
 getMagasin(){
  this.magasinService.getMagasin()
     .subscribe(data=>{
       this.magasins = data._embedded.magasins;
     }, err=>{
        console.log(err);
     })
} 
InfoForm() {
    this.service.formData = this.fb.group({
      id :null,
      annee : 0,
      numero : 0,
      date : '',
      code_client : 0,
      lib_client : '',
      totht : 0,
      tottva : 0,
      totttc : 0,
      mt:0,
      reste: 0,
      modepayement:'',
      mag:'',
      lcomms :[],
      idUtilisateur:'',
      });
    } 
  
resetForm() {
      this.service.formData.reset();
  }

AddData(lcommandeIndex,Id){  
    this.mt = this.tht;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex,Id};
    this.dialog.open(AddLcommandeComponent, dialogConfig).afterClosed().subscribe(b10=>{
      this.calcul();
    });
  }

  
onDelete(item : Lcommande,Id:number,i:number){
    if(Id != null)
    this.service.formData.value.id+=Id ;
   this.service.list.splice(i,1);
   this.calcul();
   }

calcul(){
  this.f['totht'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + (curr.totht - curr.tottva) ;
  }, 0));
  this.f['tottva'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + curr.tottva;
  }, 0));
  this.f['totttc'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + (curr.totht - curr.tottva) + curr.tottva;
  }, 0));   
   
   }
validateForm(){
     this.isValid = true ;
    
     if(this.service.formData.value.id_client==0)
     this.isValid =false;
    
     else if (this.service.list.length==0)
     this.isValid =false;
     return this.isValid;
   }

onSubmit(){
  this.valider= true;
  this.complefac = new Date().getDate()+new Date().getMinutes()+new Date().getMilliseconds() +localStorage.getItem('magasin').replace(/[aeiouyAEIOUY]/g,"").toUpperCase();
  
  this.compteurservice.getData(this.annee).subscribe(
    response =>{
      this.compteur = response;
      this.f['numero'].setValue(this.annee + this.complefac);
      }
   );
     if(this.credit==true){
      this.f['totttc'].setValue(this.service.list.reduce((prev, curr) => {
        return prev + curr.totht;
      }, 0));
      //this.f['tottva'].setValue(this.ttva);
      this.f['lcomms'].setValue(this.service.list);
      this.service.saveOrUpdate1(this.service.formData.value);
      this.service.saveOrUpdate(this.service.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.facture = JSON.parse(localStorage.getItem('Commande'));
      if(this.monaie == "cdf"){
        this.generatePdfc();
      }else{
        this.generatePdfusdc();
      }
      this.router.navigate(['/lcomm']);
      this.InfoForm();
      this.isentreprise= false; 
        
      },()=>{
        this.toastr.warning( 'Facture non enregistrée');
      });
      
     
     }else if(this.credit==false){
      
        this.mt = this.ttc;
        this.f['lcomms'].setValue(this.service.list);
        this.f['mt'].setValue(this.mt);
        this.service.saveOrUpdate1(this.service.formData.value);
        console.log(this.service.formData.value);
        this.service.saveOrUpdate(this.service.formData.value).
        subscribe( data => {
          this.toastr.success( 'Validation Faite avec Success');
          this.facture = JSON.parse(localStorage.getItem('Commande'));
        if(this.monaie == "cdf"){
          this.generatePdf();
        }else{
          this.generatePdfusd();
        }
        
        this.router.navigate(['/lcomm']);
        this.InfoForm();
        this.isentreprise= false; 
          
        },()=>{
          this.toastr.warning( 'Facture non enregistrée');
        });
         
     }
        this.valider = false;
   }
   monaie1(){
     this.monaie= "cdf";
     console.log(this.monaie);
   }
   monaie2(){
     this.monaie = "usd";
     console.log(this.monaie);
  }
transformDate(date){
     return this.datePipe.transform(date, 'yyyy-MM-dd');
   }
OnSelectClient(ctrl)
   {
      if(ctrl.selectedIndex == 0){
       this.f['lib_client'].setValue('');
       this.f['code_client'].setValue('');
       
       
      }
      else{
         this.f['lib_client'].setValue(this.ClientList[ctrl.selectedIndex - 1].libelle);
         this.f['code_client'].setValue(this.ClientList[ctrl.selectedIndex - 1].code);
         
      }
    }
OnSelectMag(ctrl)
{
   if(ctrl.selectedIndex == 0){
    this.f['lib_client'].setValue('');
    this.f['code_client'].setValue('');
    
    
   }
   else{
      this.f['lib_client'].setValue(this.magasins[ctrl.selectedIndex - 1].libelle);
      this.f['code_client'].setValue(this.magasins[ctrl.selectedIndex - 1].id);
      
   }
 }  
verrou(){
 this.isentreprise= true;
 this.credit = false;
 this.isSite = false;
 
} 
verrou1(){
  this.isentreprise= false;
  this.credit = false;
  this.isSite= false;
  
} 
verrou2(){
  this.isentreprise= false;
  this.credit = true;
  this.isSite = false;
  
}
verrou3(){
  this.isentreprise= false;
  this.credit = false;
  this.isSite = true;
  
}
nyongo(){
  this.dette = true;
} 
generatePdf(){
  const documant =this.getDocument();
  pdfMake.createPdf(documant).open();
}
getDocument(){
 return{
   content:[
     
      {
        text:'ABRO',
        style:'ligne3'
      },
      
      {
        text:'VENTE PIECES DE RECHANGE ET ACCESSOIRES D ORIGINE',
        style:'ligne2'
      }
      ,
      {
        text:'TOUTES MARQUES JAPONAISES ET COREENNES',
        style:'ligne2'
      }
      ,
      {
        text:'CD/KIN/RCCM/14-A-05398 -Id. Nat. 01-93-N 43402 L N° impot: A0701567 M',
        style:'ligne2'
      },
      {
        text:'Adresse:  '+ JSON.parse(localStorage.getItem('libmag')).adresse + ' ' + 'Tél:(+243)0999942222',
        style:'ligne2'
      },
       
      {
        text:'------------------------------------------------------------------------------------------------------------------------------------',
        style:'ligne'
      },
      {
        text:'Kinshasa, le'+' ' + new Date().toLocaleDateString(),
        alignment:'right'
      },
      {
        text:new Date().toLocaleTimeString(),
        alignment:'right'
      },
      {
        text:'FACTURE N° *'+this.facture.numero,
        bold:true,
        fontSize:20,
        alignment:'center',
        margin:[0,0,0,20]
      },
      {
        text:'Client : '+ this.facture.lib_client,
        style:'ligne'
      },
      {
        text:'Mode paiement :  '+ this.facture.modepayement,
        style:'ligne'
      },
      {
        text:'Doit pour ce qui suit:',
        alignment:'center'
      },

     this.getList(this.facture.lcomms),
     {
      
     },
     {
      text:' ',
      style:'header'
    },
    {
      text: 'Tot. hors taxe: '+(this.facture.totht * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2)  + ' CDF',
      style:'total'
    },
    {
      text: 'Tva 16%: '+(this.facture.tottva * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2)  + ' CDF',
      style:'total'
    },
    
    {
      text:'TOTAL: '+ (this.facture.totttc * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' CDF',
      style:'total'
      
    },
    {
      text:'TOTAL: '+ this.facture.totttc  + 'USD',
      style:'total'
      
    },
    {
      text:'Signature',
      style:'sign',
      alignment: 'right'
    },
    
    {
      text:'---------------------------------------------------------------------------------------------------------------------',
      style:'ligne'
    },
    {
      text:'Les marchandises vendues ne sont ni reprises ni échangées.',
      style:'ligne'
    }
     
   ],
   styles:{
     header:{
       fontSize: 18,
       bold:true,
       margin:[0,20,0,10],
       decoration:'underline'
     },
     name:{
       fontsize: 16,
       bold:true
     },
     total:{
       fontSize:12,
       bold:true,
       italics:true
     },
     ligne:{
      fontSize:12,
      bold:true,
      italics:true
    },
     sign:{
       margin:[0,50,0,10],
       alignment:'right',
       italics:true
     },
     ligne3:{
      fontSize:24,
      bold:true,
      italics:false,
      alignment:'center'
    },
     ligne2:{
      fontSize:10,
      bold:true,
      italics:true,
      alignment:'center'
    },
     tableHeader:{
       bold:true,
       fontSize:15,
       alignment:'center'
     }
   }
 }
}
getList(items: Lcommande[]){

return{
  table:{
    widths:[200,30,100,100],
    body:[
      [
        {
          text: 'Désignation',
          style:'tableHeader'
        },
        {
          text: 'Qte',
          style:'tableHeader'
        },
        {
          text: 'Prix Unit.',
          style:'tableHeader'
        },
        {
          text: 'Prix Tot.',
          style:'tableHeader'
        },
      ],

      ...items.map(ed=>{
        return[ed.libart,ed.qte,ed.pu *this.tauxusd,ed.totht *this.tauxusd ];
      })
    ],
    alignment:'center',
  }
};
}
// generation facture en dollars
generatePdfusd(){
const documant =this.getDocumentusd();
pdfMake.createPdf(documant).open();
}
getDocumentusd(){
return{
 content:[
   
    {
      text:'ABRO',
      style:'ligne3'
    },
    
    {
      text:'VENTE PIECES DE RECHANGE ET ACCESSOIRES D ORIGINE',
      style:'ligne2'
    }
    ,
    {
      text:'TOUTES MARQUES JAPONAISES ET COREENNES',
      style:'ligne2'
    }
    ,
    {
      text:'CD/KIN/RCCM/14-A-05398 -Id. Nat. 01-93-N 43402 L N° impot: A0701567 M',
      style:'ligne2'
    },
    {
      text:'Adresse:  '+ JSON.parse(localStorage.getItem('libmag')).adresse + ' ' + 'Tél:(+243)0999942222',
      style:'ligne2'
    },
     
    {
      text:'------------------------------------------------------------------------------------------------------------------------------------',
      style:'ligne'
    },
    {
      text:'Kinshasa, le'+' ' + new Date().toLocaleDateString(),
      alignment:'right'
    },
    {
      text:new Date().toLocaleTimeString(),
      alignment:'right'
    },
    {
      text:'FACTURE N° *'+this.facture.numero,
      bold:true,
      fontSize:20,
      alignment:'center',
      margin:[0,0,0,20]
    },
    {
      text:'Client : '+ this.facture.lib_client,
      style:'ligne'
    },
    {
      text:'Mode paiement :  '+ this.facture.modepayement,
      style:'ligne'
    },
    {
      text:'Doit pour ce qui suit:',
      alignment:'center'
    },

   this.getListusd(this.facture.lcomms),
   {
    
   },
   {
    text:' ',
    style:'header'
  },
  {
    text: 'Tot. hors taxe: '+(this.facture.totht).toFixed(2)  + ' USD', 
    style:'total'
  },
  {
    text: 'Tva 16%: '+(this.facture.tottva) .toFixed(2)  + ' USD', 
    style:'total'
  },
  
  {
    text:'Tot. TTC: ' + (this.facture.totttc ).toFixed(2) + ' USD',
    style:'total' 
    
  },
  {
    text:'Montant payé: ' + (this.facture.mt ).toFixed(2) + ' USD',
    style:'total'
    
  },
  {
    text:'Montant payé/CDF: ' + (this.facture.mt * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' CDF',
    style:'total'
    
  },
  {
    text:'Signature',
    style:'sign',
    alignment: 'right'
  },
  
  {
    text:'---------------------------------------------------------------------------------------------------------------------',
    style:'ligne'
  },
  {
    text:'Les marchandises vendues ne sont ni reprises ni échangées.',
    style:'ligne'
  }
   
 ],
 styles:{
   header:{
     fontSize: 18,
     bold:true,
     margin:[0,20,0,10],
     decoration:'underline'
   },
   name:{
     fontsize: 16,
     bold:true
   },
   total:{
     fontSize:12,
     bold:true,
     italics:true
   },
   ligne:{
    fontSize:12,
    bold:true,
    italics:true
  },
   sign:{
     margin:[0,50,0,10],
     alignment:'right',
     italics:true
   },
   ligne3:{
    fontSize:24,
    bold:true,
    italics:false,
    alignment:'center'
  },
   ligne2:{
    fontSize:10,
    bold:true,
    italics:true,
    alignment:'center'
  },
   tableHeader:{
     bold:true,
     fontSize:15,
     alignment:'center'
   }
 }
}
}
getListusd(items: Lcommande[]){

return{
table:{
  widths:[200,30,100,100],
  body:[
    [
      {
        text: 'Désignation',
        style:'tableHeader'
      },
      {
        text: 'Qte',
        style:'tableHeader'
      },
      {
        text: 'Prix Unit.',
        style:'tableHeader'
      },
      {
        text: 'Prix Tot.',
        style:'tableHeader'
      },
    ],

    ...items.map(ed=>{
      return[ed.libart,ed.qte,ed.pu ,ed.totht ];
    })
  ],
  alignment:'center',
}
};
}
//facture pour le crédit

generatePdfc(){
const documant =this.getDocumentc();
pdfMake.createPdf(documant).open();
}
getDocumentc(){
return{
 content:[
   
    {
      text:'ABRO',
      style:'ligne3'
    },
    
    {
      text:'VENTE PIECES DE RECHANGE ET ACCESSOIRES D ORIGINE',
      style:'ligne2'
    }
    ,
    {
      text:'TOUTES MARQUES JAPONAISES ET COREENNES',
      style:'ligne2'
    }
    ,
    {
      text:'CD/KIN/RCCM/14-A-05398 -Id. Nat. 01-93-N 43402 L N° impot: A0701567 M',
      style:'ligne2'
    },
    {
      text:'Adresse:  '+ JSON.parse(localStorage.getItem('libmag')).adresse + ' ' + 'Tél:(+243)0999942222',
      style:'ligne2'
    },
     
    {
      text:'------------------------------------------------------------------------------------------------------------------------------------',
      style:'ligne'
    },
    {
      text:'Kinshasa, le'+' ' + new Date().toLocaleDateString(),
      alignment:'right'
    },
    {
      text:new Date().toLocaleTimeString(),
      alignment:'right'
    },
    {
      text:'FACTURE N° *'+this.facture.numero,
      bold:true,
      fontSize:20,
      alignment:'center',
      margin:[0,0,0,20]
    },
    {
      text:'Client : '+ this.facture.lib_client,
      style:'ligne'
    },
    {
      text:'Mode paiement :  '+ this.facture.modepayement,
      style:'ligne'
    },
    {
      text:'Doit pour ce qui suit:',
      alignment:'center'
    },

   this.getListc(this.facture.lcomms),
   {
    
   },
   {
    text:' ',
    style:'header'
  },
  {
    text: 'Tot. hors taxe: '+(this.facture.totht * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' CDF',
    style:'total'
  },
  {
    text: 'Tva 16%: '+(this.facture.tottva * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' CDF',
    style:'total'
  },
  {
    text: 'Tot. TTC: '+(this.facture.totttc * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' CDF',
    style:'total' 
    
  },
  
  {
    text: 'Montant payé: '+(this.facture.mt * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' CDF',
    style:'total'
  },
  {
    text: 'Montant payé/USD: '+this.facture.mt  + ' USD',
    style:'total'
  },
  {
    text: 'Reste: '+ ((this.facture.totttc * JSON.parse(localStorage.getItem('taux')).taux) - (this.facture.mt)*JSON.parse(localStorage.getItem('taux')).taux) + ' CDF',
    style:'total'
  },
  
  
  {
    text:'Signature',
    style:'sign',
    alignment: 'right'
  },
  
  {
    text:'---------------------------------------------------------------------------------------------------------------------',
    style:'ligne'
  },
  {
    text:'Les marchandises vendues ne sont ni reprises ni échangées.',
    style:'ligne'
  }
   
 ],
 styles:{
   header:{
     fontSize: 18,
     bold:true,
     margin:[0,20,0,10],
     decoration:'underline'
   },
   name:{
     fontsize: 16,
     bold:true
   },
   total:{
     fontSize:12,
     bold:true,
     italics:true
   },
   ligne:{
    fontSize:12,
    bold:true,
    italics:true
  },
   sign:{
     margin:[0,50,0,10],
     alignment:'right',
     italics:true
   },
   ligne3:{
    fontSize:24,
    bold:true,
    italics:false,
    alignment:'center'
  },
   ligne2:{
    fontSize:10,
    bold:true,
    italics:true,
    alignment:'center'
  },
   tableHeader:{
     bold:true,
     fontSize:15,
     alignment:'center'
   }
 }
}
}
getListc(items: Lcommande[]){

return{
table:{
  widths:[200,30,100,100],
  body:[
    [
      {
        text: 'Désignation',
        style:'tableHeader'
      },
      {
        text: 'Qte',
        style:'tableHeader'
      },
      {
        text: 'Prix Unit.',
        style:'tableHeader'
      },
      {
        text: 'Prix Tot.',
        style:'tableHeader'
      },
    ],

    ...items.map(ed=>{
      return[ed.libart,ed.qte,ed.pu *this.tauxusd,ed.totht *this.tauxusd ];
    })
  ],
  alignment:'center',
}
};
}
// generation facture en dollars
generatePdfusdc(){
const documant =this.getDocumentusdc();
pdfMake.createPdf(documant).open();
}
getDocumentusdc(){
return{
content:[
 
  {
    text:'ABRO',
    style:'ligne3'
  },
  
  {
    text:'VENTE PIECES DE RECHANGE ET ACCESSOIRES D ORIGINE',
    style:'ligne2'
  }
  ,
  {
    text:'TOUTES MARQUES JAPONAISES ET COREENNES',
    style:'ligne2'
  }
  ,
  {
    text:'CD/KIN/RCCM/14-A-05398 -Id. Nat. 01-93-N 43402 L N° impot: A0701567 M',
    style:'ligne2'
  },
  {
    text:'Adresse:  '+ JSON.parse(localStorage.getItem('libmag')).adresse + ' ' + 'Tél:(+243)0999942222',
    style:'ligne2'
  },
   
  {
    text:'------------------------------------------------------------------------------------------------------------------------------------',
    style:'ligne'
  },
  {
    text:'Kinshasa, le'+' ' + new Date().toLocaleDateString(),
    alignment:'right'
  },
  {
    text:new Date().toLocaleTimeString(),
    alignment:'right'
  },
  {
    text:'FACTURE N° *'+this.facture.numero,
    bold:true,
    fontSize:20,
    alignment:'center',
    margin:[0,0,0,20]
  },
  {
    text:'Client : '+ this.facture.lib_client,
    style:'ligne'
  },
  {
    text:'Mode paiement :  '+ this.facture.modepayement,
    style:'ligne'
  },
  {
    text:'Doit pour ce qui suit:',
    alignment:'center'
  },

 this.getListusdc(this.facture.lcomms),
 {
  
 },
 {
  text:' ',
  style:'header'
},
{
  text: 'Tot. hors taxe: '+(this.facture.totht ).toFixed(2)  + ' USD', 
  style:'total'
},
{
  text: 'Tva 16%: '+(this.facture.tottva ).toFixed(2)  + ' USD', 
  style:'total'
},

{
  text:'Tot. TTC: ' + (this.facture.totttc ).toFixed(2) + ' USD',
  style:'total'
  
},
{
  text:'Montant payé: ' + (this.facture.mt).toFixed(2) + ' USD',
  style:'total' 
  },
  {
    text:'Montant payé: ' + (this.facture.mt * JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' USD',
    style:'total' 
    },
  {
    text: 'Reste: '+ ((this.facture.totttc - this.facture.mt)).toFixed(2) + ' USD',
    style:'total'
  },
{
  text:'Signature',
  style:'sign',
  alignment: 'right'
},

{
  text:'---------------------------------------------------------------------------------------------------------------------',
  style:'ligne'
},
{
  text:'Les marchandises vendues ne sont ni reprises ni échangées.',
  style:'ligne'
}
 
],
styles:{
 header:{
   fontSize: 18,
   bold:true,
   margin:[0,20,0,10],
   decoration:'underline'
 },
 name:{
   fontsize: 16,
   bold:true
 },
 total:{
   fontSize:12,
   bold:true,
   italics:true
 },
 ligne:{
  fontSize:12,
  bold:true,
  italics:true
},
 sign:{
   margin:[0,50,0,10],
   alignment:'right',
   italics:true
 },
 ligne3:{
  fontSize:24,
  bold:true,
  italics:false,
  alignment:'center'
},
 ligne2:{
  fontSize:10,
  bold:true,
  italics:true,
  alignment:'center'
},
 tableHeader:{
   bold:true,
   fontSize:15,
   alignment:'center'
 }
}
}
}
getListusdc(items: Lcommande[]){

return{
table:{
widths:[200,30,100,100],
body:[
  [
    {
      text: 'Désignation',
      style:'tableHeader'
    },
    {
      text: 'Qte',
      style:'tableHeader'
    },
    {
      text: 'Prix Unit.',
      style:'tableHeader'
    },
    {
      text: 'Prix Tot.',
      style:'tableHeader'
    },
  ],

  ...items.map(ed=>{
    return[ed.libart,ed.qte,ed.pu,ed.totht ];
  })
],
alignment:'center',
}
};
}
}
