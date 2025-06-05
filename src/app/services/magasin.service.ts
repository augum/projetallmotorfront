import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Magasin} from '../model/magasin';
import {HOST_URL} from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
  private magasin;
  private baseUrl = '/api/magasins';
  constructor(private http:HttpClient) { }

  public getMagasin(): Observable<any>{
     return this.http.get(HOST_URL.HOST+"/magasins");
  }

  public addmagasin(magasin:Magasin){
      return this.http.post(HOST_URL.HOST+"/magasins",magasin);
 }
 public updateMagasin(url:string,magasin:Magasin){
  return this.http.patch(url,magasin);
}
supprimerMagasin(url:string){
  return this.http.delete(url);
 }
 getAll(): Observable<any> {
  return this.http.get(HOST_URL.HOST+"/api/magasins");
}
getAll1(): Observable<any> {
  this.magasin = localStorage.getItem('magasin');
  return this.http.get(HOST_URL.HOST+"/api/magasins/"+this.magasin);
}
}
