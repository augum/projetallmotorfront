import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { ClientService } from 'src/app/services/client.service';
import { LcommandeService } from 'src/app/services/lcommande.service';
import pdfMake from 'pdfmake/build/pdfmake';
import {map} from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Lcommande} from 'src/app/model/lcommande';

@Component({
  selector: 'app-facturentreprise',
  templateUrl: './facturentreprise.component.html',
  styleUrls: ['./facturentreprise.component.css']
})
export class FacturentrepriseComponent implements OnInit {
  public clients;
  public articles;
  public somme;
  private facture;
  data;
  p: number = 1;
  isSubmitted:boolean;
  formtemplate = new FormGroup({
    date1: new FormControl('',Validators.required),
    date2: new FormControl('',Validators.required),
    entreprise: new FormControl('',Validators.required),
    
  })
  constructor(public clientService :ClientService,public lcommservice:LcommandeService) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(
      response =>{this.clients = response;}
     );
  }
  chercher(formValue){
    this.isSubmitted= true;
    this.lcommservice.getAll2(formValue.entreprise,formValue.date1,formValue.date2).subscribe(
      response =>{this.articles = response;
        console.log(this.articles);
      }
      
     );

     this.lcommservice.somme(formValue.entreprise,formValue.date1,formValue.date2).subscribe(
      response =>{this.somme = response;
        console.log(this.somme);
      }
      
     );
     
     localStorage.setItem("date1",JSON.stringify(formValue.date1));
     localStorage.setItem("date2",JSON.stringify(formValue.date2));
     localStorage.setItem("entreprise",JSON.stringify(formValue.entreprise));
    
  }
  print(){
    localStorage.setItem("factureentre",JSON.stringify(this.articles));
    localStorage.setItem("sommeentre",JSON.stringify(this.somme));
    this.facture = JSON.parse(localStorage.getItem('factureentre'));
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
         text:new Date().toLocaleDateString(),
         alignment:'right'
       },
       {
         text:new Date().toLocaleTimeString(),
         alignment:'right'
       },
       
       {
         text:'Champions  motors',
         style:'name'
       },
       {
         text:'vente des pièces de rechange auto',
         style:'ligne'
       },
       {
         text:'Email:samasoft@gmail.com',
         color:'blue',
       },
       {
         text:'Tel:0817454018',
         color:'blue',
       }, 
       
       {
         text:'Entreprise:  '+ JSON.parse(localStorage.getItem('entreprise')),
         style:'ligne',
         bold:true,
         fontSize:20,
         alignment:'center',
       },
       {
         text:'------------------------------------------------------------------------------------------------------------------------------------',
         style:'ligne'
       },
       {
        text:'Période facturée',
         bold:true,
         fontSize:20,
         alignment:'center',
         margin:[0,0,0,20]
       }
       ,
       {
        text:' Du '+ JSON.parse(localStorage.getItem('date1'))+' AU '+JSON.parse(localStorage.getItem('date2')),
         bold:true,
         fontSize:10,
         alignment:'center',
         margin:[0,0,0,20]
       },
      this.getList(this.facture),
      {
       
      },
      {
       text:' ',
       style:'header'
     },
     {
       text: 'Tot. TTC: '+JSON.parse(localStorage.getItem('sommeentre')) + ' CDF',
       style:'total' 
     },
     {
      text: 'Tot. TTC: '+JSON.parse(localStorage.getItem('sommeentre'))/JSON.parse(localStorage.getItem('taux')).taux + ' USD',
      style:'total' 
    },
     {
       text:'Signature',
       style:'sign',
       alignment: 'right'
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
      widths:[200,100,30,100],
      body:[
        [
          {
            text: 'Désignation',
            style:'tableHeader'
          },
          {
            text: 'Prix',
            style:'tableHeader'
          },
          {
            text: 'QTe',
            style:'tableHeader'
          },
          {
            text: 'Montant hors taxe',
            style:'tableHeader'
          },
        ],

        ...items.map(ed=>{
          return[ed.libart,ed.pu,ed.qte,ed.totht];
        })
      ],
      alignment:'center',
    }
  };
}
get formControls(){
    return this.formtemplate['controls'];
  }
}
