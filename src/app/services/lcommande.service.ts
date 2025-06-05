import { Injectable } from '@angular/core';
import { Lcommande } from '../model/lcommande';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST_URL } from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class LcommandeService {
  private baseUrl = '/api/lcomms';
  private baseUrl1 = '/api/lcom';
 
  lcommande : Lcommande = new Lcommande();
  lcommandeList : Lcommande[];
 
  constructor(private http: HttpClient) { }
  addLcomm(info: Object): Observable<Object> {
    return this.http.post(HOST_URL.HOST+"/api/lcomms/", info);
  }
 getAll(id: number): Observable<Object> {
   return this.http.get(HOST_URL.HOST+"/api/lcomms/"+id);
 }
 resume(): Observable<any> {
  // this.modepayement ="cash" 
  //return this.http.get(HOST_URL.HOST+"/api/lcommArt");
  return this.http.get(HOST_URL.HOST+"/lcomms");
 }
 getAll2(entreprise:string,date1:Date,date2:Date): Observable<any> {
  // this.modepayement ="cash"
   return this.http.get(HOST_URL.HOST+"/api/listeparclient?"+"client="+entreprise+"&"+"date1="+date1+"&"+"date2="+date2);
 }
 somme(entreprise:string,date1:Date,date2:Date): Observable<any> {
  //this.modepayement ="cash"
  return this.http.get(HOST_URL.HOST+"/api/sommeparclient?"+"client="+entreprise+"&"+"date1="+date1+"&"+"date2="+date2);

}
 getAllf(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcommsf/"+id);
}
getData1f(id: number): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcomf/"+id);
}
 getData1(id): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcom/"+id);
}
getData2(nom: string): Observable<Object> {
  return this.http.get(HOST_URL.HOST+"/api/lcomc/"+nom);
}

getListVente(date1: Date, date2: Date): Observable<any> {
  return this.http.get(HOST_URL.HOST+"/api/lcommDate?"+"date1="+date1+"&"+"date2="+date2);
}
}
