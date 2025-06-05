import { Injectable } from '@angular/core';
import { Lcommande } from '../model/lcommande';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST_URL } from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class BlcommandeService {
  private baseUrl = '/api/blcomms';
  private baseUrl1 = '/api/blcom';
 
  lcommande : Lcommande = new Lcommande();
  lcommandeList : Lcommande[];
 
  constructor(private http: HttpClient) { }
  addLcomm(info: Object): Observable<Object> {
    return this.http.post(HOST_URL.HOST+"/api/blcomms/", info);
  }
 getAll(id: number): Observable<Object> {
   return this.http.get(HOST_URL.HOST+"/api/blcom/"+id); 
 }
 getData1(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/blcom/"+id);
}
 
}


