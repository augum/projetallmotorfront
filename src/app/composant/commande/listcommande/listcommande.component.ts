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
  selector: 'app-list-commande',
  templateUrl: './listcommande.component.html',
  styleUrls: ['./listcommande.component.scss']
})
export class ListcommandeComponent implements OnInit {
  commandeListe;
  p: number = 1;
  public somme=0;
  public externe=0;
  public interne=0;
  public dollar = JSON.parse(localStorage.getItem('taux')).taux;
  isSubmitted:boolean;
  SearchText :string;
  listecom;
  formtemplate = new FormGroup({
    
    payement: new FormControl(''),
    numero: new FormControl(''),
  })
  constructor( private service :CommandeService,private servicef: CommandefService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
     this.init();
  }
 init() {
  let typep:string="cash"
  /*this.refreshListe();
  this.getData();*/
  this.service.getAll3(typep).subscribe(
    response =>{this.commandeListe = response;
      console.log(this.commandeListe);
      localStorage.setItem("listecommande",JSON.stringify(this.commandeListe));
      
    }
    
   );

   this.service.sommeuS(typep).subscribe(
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
  this.somme=0;
  this.externe = 0;
  this.interne = 0;
  //console.log(formValue.payement);
  this.service.getAll3(formValue.payement).subscribe(
    response =>{
      this.commandeListe = response;
      
      console.log(this.commandeListe);
      
    }
    
   );

   this.service.sommeuS(formValue.payement).subscribe(
    response =>{
      
      this.somme = response;
      console.log(this.somme);
    }
    
   );

   this.service.sommeu1(formValue.payement).subscribe(
    response =>{
      
      
      this.externe = response;
      console.log(this.externe);
    }
    
   );

   this.interne = this.somme - this.externe;
}
chercherNum(formValue){
  this.isSubmitted= true;
  //console.log(formValue.payement);
  this.service.getAll31(formValue.numero).subscribe(
    response =>{this.commandeListe = response;
      console.log(this.commandeListe);
      this.somme = 0;
    }
    
   );
}
get formControls(){
  return this.formtemplate['controls'];
}
print(){
  this.init();
  this.listecom = JSON.parse(localStorage.getItem('listecommande'));
  this.generatePdf();
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
        text:'Adresse:  '+ JSON.parse(localStorage.getItem('libmag')).adresse ,
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
        text:'RAPPORT JOURNALIER DE VENTE:',
        alignment:'center'
      },
      this.getList(this.listecom),
      {
        
      },
      {
        text:'---------------------------------------------------------------------------------------------------------------------------------------------------' , 
        
      },
      {
        text:'Total: ' + this.somme+'' + " CDF", 
        
      },
      {
        text:(this.somme / JSON.parse(localStorage.getItem('taux')).taux).toFixed(2) + ' USD',
        
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
getList(items: Commande[]){
  return{
    table:{
       widths:['*','*','*','*'],
       body:[
         [
         {
           text:'Numero',
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
           return[ed.numero,ed.lib_client,ed.totttc,ed.modepayement];
         })
       ]
    }
  }
}
}

