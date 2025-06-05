import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { Router,NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MagasinService } from 'src/app/services/magasin.service';
import { LcommandeService } from 'src/app/services/lcommande.service';
import { Commande } from 'src/app/model/commande';
import pdfMake from 'pdfmake/build/pdfmake';
import {map} from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Lcommande } from 'src/app/model/lcommande';

@Component({
  selector: 'app-detailcomminter',
  templateUrl: './detailcomminter.component.html',
  styleUrls: ['./detailcomminter.component.css']
})
export class DetailcomminterComponent implements OnInit {
  commandeListe;
  listecom;
  public somme=0;
  public somme1=0;
  public interne=0;
  isSubmitted:boolean;
  p: number = 1;
  rapport= true;
  private facture;
  public magasins;
  public resume;
  public dollar = JSON.parse(localStorage.getItem('taux')).taux;
  formtemplate = new FormGroup({
    date1: new FormControl('',Validators.required),
    date2: new FormControl('',Validators.required),
    magasin: new FormControl('',Validators.required),
    payement: new FormControl(''),
    numero: new FormControl(''),
    date3: new FormControl(''),
    date4: new FormControl(''),
  })
  constructor( private service :CommandeService,private lcommservice:LcommandeService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe,private magasinService:MagasinService) { }

  ngOnInit(): void {
    this.getMagasin();
    this.synthese();
  }
  getMagasin(){
    this.magasinService.getMagasin()
       .subscribe(data=>{
         this.magasins = data;
       }, err=>{
          console.log(err);
       })
  }
  report(){
    this.rapport= false;
    this.somme = 0;
  }
  report2(){
    this.rapport= true;
  }
  chercher(formValue){
      this.isSubmitted= true;
      this.somme=0;
      this.somme1 = 0;
      this.interne = 0;
      this.service.getAllDetail(formValue.magasin,formValue.date1,formValue.date2).subscribe(
        response =>{
          this.commandeListe = response;
          localStorage.setItem("listecommande3",JSON.stringify(this.commandeListe));
        }
        
       );

       this.service.somme(formValue.magasin,formValue.date1,formValue.date2,formValue.payement).subscribe(
        response =>{this.somme = response;
          
        }
        
       );
       this.service.somme1(formValue.date1,formValue.date2,formValue.magasin,formValue.payement).subscribe(
        response =>{this.somme1 = response;
          console.log(this.somme1);
        }
        
       );

       this.interne = this.somme - this.somme1;
  }
  synthese(){
    this.isSubmitted= true;
    this.lcommservice.resume().subscribe(
      response =>{this.resume = response;
        console.log(this.resume);
      }
      
     );

}
  chercherNum(formValue){
    this.isSubmitted= true;
    //console.log(formValue.payement);
    this.service.getAll31(formValue.numero).subscribe(
      response =>{this.commandeListe = response;
        console.log(this.commandeListe);
        localStorage.setItem("listecommande3",JSON.stringify(this.commandeListe));
        this.somme = 0;
      }
      
     );
  }
  get formControls(){
    return this.formtemplate['controls'];
  }
  onDetail(comm){
    let navigationExtras: NavigationExtras={
      queryParams:{
        special:btoa(JSON.stringify(comm))
      }
    };
    this.router.navigate(['updatecommande'],navigationExtras);
  }
  print(){
    this.listecom = JSON.parse(localStorage.getItem('listecommande3'));
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
         widths:['*','*','*','*','*'],
         body:[
           [
           {
             text:'Numero',
             style:'tableHeader'
           },
           {
             text:'Article',
             style:'tableHeader'
           },
           {
             text:'Qte',
             style:'tableHeader'
           },
           {
            text:'Moyen payement',
            style:'tableHeader'
          },
          {
            text:'Date',
            style:'tableHeader'
          },
           
           ],
           ...items.map(ed=>{
             return[ed.numero,ed.libart,ed.qte,ed.modepayement,ed.date];
           })
         ]
      }
    }
  }
}
