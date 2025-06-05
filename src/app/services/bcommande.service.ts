import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../model/commande';
import { Lcommande } from '../model/lcommande';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { ClientService } from './client.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import {HOST_URL} from '../config/host';
import { BlcommandeService } from './blcommande.service';


@Injectable({
  providedIn: 'root'
})
export class BcommandeService implements OnInit {
  private baseUrl = '/api/bcomms';
  public formData:  FormGroup; 
  list: any={};
  modepayement:string;
  listData : Commande[];
  livr;
  llivr;
  client;
  commande : Commande;
  mag;
  datej;
 
  constructor(private http:HttpClient,private toastr: ToastrService,private clientService:ClientService,
    private llservice:BlcommandeService,private datePipe : DatePipe) { }
    ngOnInit() {
    
      this.livr ="";
      this.llivr = "";
      
    }
  choixmenu : string  = "A";
  getData(id: number): Observable<Object> {
    return this.http.get(HOST_URL.HOST+"/api/bcomms/"+id);
  }
 
  saveOrUpdate(info: Object) {
    //localStorage.setItem("Commande",JSON.stringify(info));
   return this.http.post(HOST_URL.HOST+"/api/bcomms/",info);
   
  }
  saveOrUpdate1(info: Object) {
    localStorage.setItem("BCommande",JSON.stringify(info));
   
  }

  
  
  //saveOrUpdate(info: Object): Observable<Object> {
  
   // return this.http.post(`${this.baseUrl}`, info);
  //}
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(HOST_URL.HOST+"/api/bcomms/"+id, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(HOST_URL.HOST+"/api/bcomms/"+id, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(HOST_URL.HOST+"/api/bcomms/");
  }
  getAll1(): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    this.datej = this.transformDate(new Date(Date.now()));
    return this.http.get(HOST_URL.HOST+"/api/bcommsd?"+"mag="+this.mag+"&"+"date="+this.datej);
  }
  getAll3(date1:Date): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    return this.http.get(HOST_URL.HOST+"/api/bcommsd?"+"mag="+this.mag+"&"+"date="+date1);
  }
  getAll4(date1:Date): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    return this.http.get(HOST_URL.HOST+"/api/bcommsd2?"+"libelle="+this.mag+"&"+"date="+date1);
  }
  getAll2(mag:number,date1:Date,date2:Date,payement:string): Observable<any> {
   // this.modepayement ="cash"
    return this.http.get(HOST_URL.HOST+"/api/bcommsdI?"+"mag="+mag+"&"+"date1="+date1+"&"+"date2="+date2+"&"+"modepayement="+payement);
  }
  somme(mag:number,date1:Date,date2:Date,payement:string): Observable<any> {
    //this.modepayement ="cash"
    return this.http.get(HOST_URL.HOST+"/api/bsommetout?"+"mag="+mag+"&"+"date1="+date1+"&"+"date2="+date2+"&"+"modepayement="+payement);
  }
  sommeu(payement:string): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    this.datej = this.transformDate(new Date(Date.now()));
    return this.http.get(HOST_URL.HOST+"/api/bsommeun?"+"mag="+this.mag+"&"+"date="+this.datej+"&"+"modepayement="+payement);
  }
  deleteAll(id: number): Observable<any> {
  
    return this.http.delete(HOST_URL.HOST+"/api/bcomms/"+id, { responseType: 'text' });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  getDocument(id:number){
    this.getData(id).subscribe(
    response=>{
      this.livr = response;
      console.log(this.livr);
    });
    this.llservice.getData1(this.livr.numero).subscribe(
      response =>{
        this.llivr = response;
        console.log(this.llivr);
      }
    )
    this.clientService.getData(this.livr.code_client).subscribe(
      response=>{
        this.client = response;
      }
    );
    /*sessionStorage.setItem('livr',JSON.stringify(this.livr));*/
    return{
      content:[
        {
          text:'GENERAL MOTOR',
          style:'name'
        },
        {
          text:'kinshasa',
          style:'name'
        },
        {
          text:'FACTURE',
          bold:true,
          fontSize: 20,
          alignment: 'center',
          margin:[0,20,20,0]
        },
        {
          columns:[
            [
              {
                text:'Numero:'+ this.livr.numero,
                style:'ligne',
                margin:[0,10,0,0]
              },
              {
                text:'Date:' + this.livr.date_liv,
                style:'ligne',
                margin:[0,10,0,0]
              },
              {
                text:'Code: '+ this.livr.code_client,
                style:'ligne1',
                margin:[0,10,0,0]
              },
              {
                text:'Nom client: '+ this.livr.lib_client,
                style:'ligne1',
                margin:[0,10,0,0]
              },
            ],
          ]
        },

        this.getDetails(this.llivr),
        {

        },
        {
          text:' ',
          style:'header'
        },
        {
          text: 'Tot ht: '+this.livr.totht + '  Tot rem: '+this.livr.totrem + ' Tot fodec: '+this.livr.totfodec 
          + ' Tot tva: '+this.livr.tottva +' Tot ttc : '+this.livr.totttc +'',
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
          fontSize: 16,
          bold: true,
          alignement: 'center'
        }
      }
    }
    this.livr="";
  }
  getDetails(items: Lcommande[]){
    return{
      table:{
        widths:[200,50,50,50,50,50],
        body:[
          [
            {
              text: 'Designation',
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
              text: 'Tva',
              style:'tableHeader'
            },
            {
              text: 'Mont ht',
              style:'tableHeader'
            },
          ],

          ...items.map(ed=>{
            return[ed.libart,ed.pu,ed.qte,ed.tva,ed.totht];
          })
        ]
      }
    };
  }
         
}


