
import { Injectable } from '@angular/core';
import { LcommandePret } from '../model/lcommandepret';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST_URL } from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class LcommandepretService {
  private baseUrl = '/api/lcommsPret';
  private baseUrl1 = '/api/lcommsPret';
 
  lcommande : LcommandePret = new LcommandePret();
  lcommandeList : LcommandePret[];
 
  constructor(private http: HttpClient) { }
  addLcomm(info: Object): Observable<Object> {
    return this.http.post(HOST_URL.HOST+"/api/lcommsPret/", info);
  }
 getAll(id: number): Observable<Object> {
   return this.http.get(HOST_URL.HOST+"/api/lcommsPret/"+id);
 }
 getData1(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcommsPret/"+id);
}
 
}
