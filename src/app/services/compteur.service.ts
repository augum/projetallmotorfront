import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compteur} from '../model/compteur'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { HOST_URL } from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class CompteurService {
  private baseUrl = '/api/compteurs';
  choixmenu : string  = 'A';
  listData : Compteur[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: number): Observable<Object> {
    return this.http.get(HOST_URL.HOST+"/api/compteurs/"+id);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(HOST_URL.HOST+"/api/compteurs/", info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(HOST_URL.HOST+"/api/compteurs/"+id, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(HOST_URL.HOST+"/api/compteurs/"+id, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(HOST_URL.HOST+"/api/compteurs/");
  }
}
