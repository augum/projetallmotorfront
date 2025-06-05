
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Lcommande } from '../model/lcommande';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { ClientService } from './client.service';
import { LcommandeService } from './lcommande.service';
import { LcommandepretService } from './lcommandepret.service';
import { DatePipe } from '@angular/common';
import {HOST_URL} from '../config/host';


@Injectable({
  providedIn: 'root'
})
export class CommandepretService implements OnInit {
  private baseUrl = '/api/commMags';
  public formData:  FormGroup; 
  list: any={};
  livr;
  llivr;
  client;
  mag;
  datej;
  
  constructor(private http:HttpClient,private toastr: ToastrService,private clientService:ClientService,
    private llservice:LcommandepretService,private datePipe : DatePipe) { }
    ngOnInit() {
    
      this.livr ="";
      this.llivr = "";
      
    }
  choixmenu : string  = "A";
  getData(id: number): Observable<Object> {
    return this.http.get(HOST_URL.HOST+"/api/commPrets/"+id);
  }
 
  saveOrUpdate(info: Object) {
    //localStorage.setItem("Depot",JSON.stringify(info));
   return this.http.post(HOST_URL.HOST+"/api/commPrets/",info);
  }
  saveOrUpdate1(info: Object) {
    localStorage.setItem("Commande",JSON.stringify(info));
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(HOST_URL.HOST+"/api/commPrets/"+id, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(HOST_URL.HOST+"/api/commPrets/"+id, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(HOST_URL.HOST+"/api/commPrets/");
  }
  getAll1(): Observable<any> {
    this.mag = localStorage.getItem('magasin');
    this.datej = this.transformDate(new Date(Date.now()));
    return this.http.get(HOST_URL.HOST+"/api/compretsd?"+"mag="+this.mag+"&"+"date="+this.datej);
  }
  deleteAll(id: number): Observable<any> {
  
    return this.http.delete(HOST_URL.HOST+"/api/commPrets/"+id, { responseType: 'text' });
  }
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
   
}
