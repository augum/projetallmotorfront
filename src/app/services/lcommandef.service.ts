import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST_URL } from '../config/host';
import { Lcommandef } from '../model/lcommandef';

@Injectable({
  providedIn: 'root'
})
export class LcommandefService {
  private baseUrl = '/api/lcomms';
  private baseUrl1 = '/api/lcom';
 
  lcommande : Lcommandef = new Lcommandef();
  lcommandeList : Lcommandef[];
 
  constructor(private http: HttpClient) { }
  addLcomm(info: Object): Observable<Object> {
    return this.http.post(HOST_URL.HOST+"/api/lcommsf/", info);
  }
 getAll(id: number): Observable<Object> {
   return this.http.get(HOST_URL.HOST+"/api/lcommsf/"+id);
 }
 getAllf(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcommsf/"+id);
}
getData1f(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcomf/"+id);
}
 getData1(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcomf/"+id);
}
 
}
