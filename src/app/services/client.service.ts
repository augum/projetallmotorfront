import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Client} from '../model/client';
import { FormGroup } from '@angular/forms';
import {HOST_URL} from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = '/api/clients';
  choixmenu : string  = 'A';
  public dataForm:  FormGroup; 
  constructor(private http:HttpClient) { }

  public getClient(){
     return this.http.get(HOST_URL.HOST+"/clients");
  }
  public getClients(){
    return this.http.get(HOST_URL.HOST+"/client");
 }

  public addClient(client:Client){
      return this.http.post(HOST_URL.HOST+"/clients",client);
 }
 public updateClient(url:string,client:Client){
  return this.http.patch(url,client);
}
supprimerClient(url:string){
  return this.http.delete(url);
 }
 getData(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/clients/"+id);
}
 getAll(): Observable<any> {
  return this.http.get(HOST_URL.HOST+"/api/clients/");
}
}
