
import { Injectable } from '@angular/core';
import { LcommandeMag } from '../model/lcommandemag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST_URL } from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class LcommandemagService {
  private baseUrl = '/api/lcommsMag';
  private baseUrl1 = '/api/lcommMag';
 
  lcommande : LcommandeMag = new LcommandeMag();
  lcommandeList : LcommandeMag[];
 
  constructor(private http: HttpClient) { }
  addLcomm(info: Object): Observable<Object> {
    return this.http.post(HOST_URL.HOST+"/api/lcommsMag/", info);
  }
 getAll(id): Observable<Object> {
   return this.http.get(HOST_URL.HOST+"/api/lcommMag/"+id); 
 }
 getData1(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcommMag/"+id);
}
 
}
