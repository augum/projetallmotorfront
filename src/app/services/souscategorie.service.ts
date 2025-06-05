import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Souscategorie} from '../model/souscategorie';
import { Categorie } from '../model/categorie';
import {HOST_URL} from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class SouscategorieService {

  
  public baseUrl = '/api/scategories/5';
  constructor(private http:HttpClient) { }

  public getSCategorie(){
     return this.http.get(HOST_URL.HOST+"/scategories");
  }
  public getdata(code_categ:string):Observable<any>{
    return this.http.get(HOST_URL.HOST+"/api/scategories/5"+code_categ);
 }
  public addSCategorie(scategorie:Souscategorie){
      return this.http.post(HOST_URL.HOST+"/scategories",scategorie);
 }
 public updateSCategoriet(url:string,scategorie:Souscategorie){
  return this.http.patch(url,scategorie);
}
supprimerSCategorie(url:string){
  return this.http.delete(url);
 }
}
