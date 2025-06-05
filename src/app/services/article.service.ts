import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Article} from '../model/article';
import { FormGroup } from '@angular/forms';
import {HOST_URL} from '../config/host'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  
  private baseUrl = '/api/articlem';
  private baseUrl2 = '/api/article';
  private baseUrl1 = '/api/saveUserServer';
  private magasin;
  mag;
  private local="interne";
  choixmenu : string  = 'A';
  listData : Article[];
  public dataForm:  FormGroup; 
  constructor(private http:HttpClient) { 
    this.magasin = localStorage.getItem('magasin');
  }

  public getArticle(){
    this.magasin = localStorage.getItem('magasin');
     return this.http.get(HOST_URL.HOST+"/api/articlem/"+this.magasin);
  }
  public getArticles(magasin:string){
    this.magasin = localStorage.getItem('magasin');
     return this.http.get(HOST_URL.HOST+"/api/articlem/"+magasin);
  }

  public addAricle(article:Article){
      return this.http.post(HOST_URL.HOST+"/articles",article);
 }
 /*public updateArticle(id:number,article:Article){
  return this.http.patch(id,article);
}*/
updateArticle(id: number, value: any): Observable<Object> {
  return this.http.put(HOST_URL.HOST+"/api/article/"+id, value);
}
updateArticleP(codea: string, value: any): Observable<Object> {
  return this.http.put(HOST_URL.HOST+"/api/articlel/"+codea, value);
}
getAll(){
  return this.http.get(HOST_URL.HOST+"/article");
}
getDistinct():Observable<any>{
  return this.http.get(HOST_URL.HOST+"/api/articlem12")
  .pipe(
    map((response:[]) => response.map(item => item))
  );
}
getAll11(): Observable<any> {
  this.magasin = localStorage.getItem('magasin');
  return this.http.get(HOST_URL.HOST+"/api/articlem/"+this.magasin);
}
getAll1(): Observable<any> {
  this.magasin = localStorage.getItem('magasin');
  return this.http.get(HOST_URL.HOST+"/api/articlemag1?"+"mag="+this.magasin+"&"+"local="+this.local);
}
getAll2(id:number): Observable<any> {
  
  return this.http.get(HOST_URL.HOST+"/api/articlem/"+id);
}
getAllpt(nom:string): Observable<any> {
  this.mag = JSON.parse(localStorage.getItem('libmag')).id;
  return this.http.get(HOST_URL.HOST+"/api/articlemag?"+"mag="+this.mag+"&"+"article="+nom+"&"+"local="+this.local);
}
getAllpts(nom:string,magasin:string): Observable<any> {
  this.mag = JSON.parse(localStorage.getItem('libmag')).id;
  return this.http.get(HOST_URL.HOST+"/api/articlemag?"+"mag="+magasin+"&"+"article="+nom+"&"+"local="+this.local);
}
getAllpt1(magasin:string,article:string): Observable<any> {
  
  return this.http.get(HOST_URL.HOST+"/api/articlemag?"+"mag="+magasin+"&"+"article="+article);
}
getAllpts2(): Observable<any> {
  
  return this.http.get(HOST_URL.HOST+"/api/articlemag2");
}

deleteData(id: number): Observable<any> {
  return this.http.delete(HOST_URL.HOST+"/api/article/"+id, { responseType: 'text' });
}
}
