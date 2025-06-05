import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import pdfMake from 'pdfmake/build/pdfmake';
import {map} from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public data;
  public qte:number;
  public motif;
  public reste;
  private facture;
  private total;
  private reste2;
  constructor(private service:CommandeService,private activatedRoute: ActivatedRoute,private route:Router,private toastr: ToastrService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(atob(params.special));
        console.log(this.data);
      }
    });
  }

  ngOnInit(): void {
  }
  modifier(){
    let url=this.data.id
    this.data.mt = this.data.mt + this.qte;
    this.data.reste = this.data.totttc -this.data.mt; 
       this.service.updatedata(url,this.data)
         .subscribe(data=>{
           
           this.toastr.success('Paiement effectué avec succès');
           this.route.navigate(['commp']);
           this.generatePdf();
         }, error => {
          this.toastr.error('Paiement non effectué');
           console.log(error);
         })
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
         style:'name'
       },
       {
         text:JSON.parse(localStorage.getItem('libmag')).libelle,
         style:'name'
       }
       ,
       {
         text:'VENTE PIECES DE RECHARGE ET ACCESSOIRES D ORIGINE',
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
         text:'Adresse:  '+ JSON.parse(localStorage.getItem('libmag')).adresse + ' ' + 'Tél:(+243)0999942222 - 015100049',
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
         text:'FACTURE N° '+this.data.numero,
         bold:true,
         fontSize:20,
         alignment:'center',
         margin:[0,0,0,20]
       },
       {
         text:'Client: '+ this.data.lib_client,
         style:'ligne'
       },
       {
        text:'Motif de paiement: '+ this.motif,
        style:'ligne'
      },
      
       {
        text:' ',
        style:'ligne'
      },
      
     {
       text: 'Total à payer: '+this.data.totttc + ' CDF',
       style:'total'
     },
     {
       text: this.data.totttc / JSON.parse(localStorage.getItem('taux')).taux + ' USD',
       style:'total'
       
     },
     {
       text: 'Montant payé: '+this.qte + ' CDF',
       
       style:'total'
     },
     {
       text: this.qte / JSON.parse(localStorage.getItem('taux')).taux + ' USD',
       
       style:'total'
       
     },
     {
       text: 'Total  payé: '+this.data.mt + ' CDF',
       style:'total'
     },
     {
       text: this.data.mt / JSON.parse(localStorage.getItem('taux')).taux + ' USD',
       style:'total'
       
     },
     {
      text: 'Reste: '+this.data.reste + ' CDF',
      style:'total'
    },
    {
      text: this.data.reste / JSON.parse(localStorage.getItem('taux')).taux + ' USD',
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
}
