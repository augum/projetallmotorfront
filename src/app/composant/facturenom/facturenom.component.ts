import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommandeService } from 'src/app/services/commande.service';
import { Commande } from 'src/app/model/commande';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import {map} from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }

from '@angular/forms';
import { CommandefService } from 'src/app/services/commandef.service';
@Component({
  selector: 'app-facturenom',
  templateUrl: './facturenom.component.html',
  styleUrls: ['./facturenom.component.css']
})
export class FacturenomComponent implements OnInit {
  commandeListe;
  p: number = 1;
  public somme=0;
  public externe=0;
  public interne=0;
  isSubmitted:boolean;
  SearchText :string;
  formtemplate = new FormGroup({
    
    payement: new FormControl(''),
    numero: new FormControl(''),
    date: new FormControl(''),
  })
  constructor( private service :CommandeService,private servicef: CommandefService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
     let typep:string="cash"
    /*this.refreshListe();
    this.getData();*/
    this.service.getAll3(typep).subscribe(
      response =>{this.commandeListe = response;
        console.log(this.commandeListe);
        
      }
      
     );
  
     this.service.sommeu(typep).subscribe(
      response =>{this.somme = response;
        console.log(this.somme);
      }
      
     );

     this.service.sommeu1(typep).subscribe(
      response =>{this.externe = response;
        console.log(this.externe);
      }
      
     );
    
     this.interne = this.somme - this.externe;
  }
refreshListe(){
  this.service.getAll1().subscribe(
    response =>{this.commandeListe = response;}
   );

}

  onDelete(id: number) {
   
    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.service.deleteAll(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!'); 
            this.refreshListe();
          },
          error => console.log(error));
    }
  }
newComm()
  {
    this.service.choixmenu ="A"
  this.router.navigate(['/commande']);
  }

onSelect(item :Commande){
  
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu ="M"
  this.router.navigate(['/commande1']);
}
transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}
getData() {
  this.service.getAll1().subscribe(
    response =>{this.service.listData = response;console.log(this.service.listData)}
   );
 
}
chercher(formValue){
  this.isSubmitted= true;
  //console.log(formValue.payement);
  this.service.getAll3(formValue.payement).subscribe(
    response =>{this.commandeListe = response;
      console.log(this.commandeListe);
      
    }
    
   );

   this.service.sommeu(formValue.payement).subscribe(
    response =>{this.somme = response;
      console.log(this.somme);
    }
    
   );

   this.service.sommeu1(formValue.payement).subscribe(
    response =>{this.externe = response;
      console.log(this.externe);
    }
    
   );

   this.interne = this.somme - this.externe;
}
chercherNum(formValue){
  this.isSubmitted= true;
  //console.log(formValue.payement);
  this.service.getAll312(formValue.numero).subscribe(
    response =>{this.commandeListe = response;
      console.log(this.commandeListe);
      this.somme = 0;
    }
    
   );
}
chercherDate(formValue){
  this.isSubmitted= true;
  //console.log(formValue.payement);
  this.service.getAll3121(formValue.date).subscribe(
    response =>{this.commandeListe = response;
      console.log(this.commandeListe);
      this.somme = 0;
    }  
   );
}
get formControls(){
  return this.formtemplate['controls'];
}
generatePdf(){
  const documant =this.getDocument();
  pdfMake.createPdf(documant).open();
}
getDocument(){
  return{
    content:[
      
      {
        text:'CHAMPION MOTORS',
        style:'ligne3'
      },
      {
        text:'ETS PABCO',
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

      this.getList(this.service.listData),
      {

      },
      {
        text:'Signature',
        style:'sign',
        alignment:'right'
      },
      
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
      tableHeader:{
        bold:true,
        fontSize:15,
        alignment:'center'
      }
    }
  }
}
getList(items: Commande[]){
  return{
    table:{
       widths:['*','*','*','*','*','*'],
       body:[
         [
         {
           text:'Numero',
           style:'tableHeader'
         },
         {
           text:'date',
           style:'tableHeader'
         },
         {
           text:'Libelle',
           style:'tableHeader'
         },
         {
           text:'Client',
           style:'tableHeader'
         },
         {
           text:'TTc',
           style:'tableHeader'
         },
         {
          text:'Moyen payement',
          style:'tableHeader'
        },
         
         ],
         ...items.map(ed=>{
           return[ed.numero,ed.date,ed.libelle,ed.lib_client,ed.totttc,ed.modepayement];
         })
       ]
    }
  }
}
}

