import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Lcommandef } from '../model/lcommandef';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { ClientService } from './client.service';
import { LcommandefService } from './lcommandef.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import {HOST_URL} from '../config/host';
import { Commandef } from '../model/commandef';


@Injectable({
  providedIn: 'root'
})
export class CommandefService implements OnInit {
  private baseUrl = '/api/comms';
  public formData:  FormGroup; 
  list: any={};
  modepayement:string;
  listData : Commandef[];
  livr;
  llivr;
  client;
  commande : Commandef;
  mag;
  datej;
 
  constructor(private http:HttpClient,private toastr: ToastrService,private clientService:ClientService,
    private llservice:LcommandefService,private datePipe : DatePipe) { }
    ngOnInit() {
    
      this.livr ="";
      this.llivr = "";
      
    }
  choixmenu : string  = "A";
  getData(id: number): Observable<Object> {
    return this.http.get(HOST_URL.HOST+"/api/commsf/"+id);
  }
  saveOrUpdatef(info: Object) {
    //localStorage.setItem("Commande",JSON.stringify(info));
   return this.http.post(HOST_URL.HOST+"/api/commF/",info);
   
  }
  saveOrUpdate1(info: Object) {
    localStorage.setItem("Commande",JSON.stringify(info));
   
  }

  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(HOST_URL.HOST+"/api/commsf/"+id, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(HOST_URL.HOST+"/api/commsf/"+id, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(HOST_URL.HOST+"/api/commsf/");
  }
  getAll1(): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    this.datej = this.transformDate(new Date(Date.now()));
    return this.http.get(HOST_URL.HOST+"/api/commsd?"+"mag="+this.mag+"&"+"date="+this.datej);
  }
  getAllp(): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    return this.http.get(HOST_URL.HOST+"/api/commscf?"+"mag="+this.mag);
  }
  getAllpt(nom:string): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    return this.http.get(HOST_URL.HOST+"/api/commscnf?"+"mag="+this.mag+"&"+"client="+nom);
  }
  getAll3(payement:string): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    this.datej = this.transformDate(new Date(Date.now()));
    return this.http.get(HOST_URL.HOST+"/api/commsdf?"+"mag="+this.mag+"&"+"date="+this.datej+"&"+"modepayement="+payement);
  }
  getAll2(mag:number,date1:Date,date2:Date,payement:string): Observable<any> {
   // this.modepayement ="cash"
    return this.http.get(HOST_URL.HOST+"/api/commsdIf?"+"mag="+mag+"&"+"date1="+date1+"&"+"date2="+date2+"&"+"modepayement="+payement);
  }
  somme(mag:number,date1:Date,date2:Date,payement:string): Observable<any> {
    //this.modepayement ="cash"
    return this.http.get(HOST_URL.HOST+"/api/sommetoutf?"+"mag="+mag+"&"+"date1="+date1+"&"+"date2="+date2+"&"+"modepayement="+payement);
  }
  sommeu(payement:string): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    this.datej = this.transformDate(new Date(Date.now()));
    return this.http.get(HOST_URL.HOST+"/api/sommeunf?"+"mag="+this.mag+"&"+"date="+this.datej+"&"+"modepayement="+payement);
  }
  deleteAll(id: number): Observable<any> {
  
    return this.http.delete(HOST_URL.HOST+"/api/commsf/"+id, { responseType: 'text' });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
 
         
}
