import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Categorie} from '../model/categorie';
import {HOST_URL} from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  
  constructor(private http:HttpClient) { }

  public getCategorie(){
     return this.http.get(HOST_URL.HOST+"/categories");
  }

  public addCategorie(categorie:Categorie){
      return this.http.post(HOST_URL.HOST+"/categories",categorie);
 }
 public updateCategoriet(url:string,categorie:Categorie){
  return this.http.patch(url,categorie);
}
supprimerCategorie(url:string){
  return this.http.delete(url);
 }
}
