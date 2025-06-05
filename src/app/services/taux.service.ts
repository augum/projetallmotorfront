import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Taux} from '../model/taux';
import {HOST_URL} from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class TauxService {

  private baseUrl = '/taxes'
  constructor(private http: HttpClient) { }

  getTaux(): Observable<any> {
    return this.http.get(HOST_URL.HOST+"/taxes");
  }
  getAll1(): Observable<any> {
    
    return this.http.get(HOST_URL.HOST+"/api/taxes/1");
  }
  public addTaux(taux:Taux){
    return this.http.patch(HOST_URL.HOST+"/taxes",taux);
}
public updatetaux(url:string,user){
  return this.http.patch(url,user);
}
}
