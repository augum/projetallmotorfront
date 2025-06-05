import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Livr } from '../model/livr';
import { Llivr } from '../model/llivr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {HOST_URL} from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class LlivrService {
  private baseUrl = '/api/LLlivrs';
  private baseUrl1 = '/api/lnums';
  public formData:  FormGroup; 
  list : Llivr[] = [];
  constructor(private http:HttpClient,private toastr: ToastrService) { }
  choixmenu : number = 1;
  getData(id: number): Observable<Object> {
    return this.http.get(HOST_URL.HOST+"/api/LLlivrs/"+id);
  }
  getData1(id: number): Observable<Object> {
    return this.http.get(HOST_URL.HOST+"/api/lnums/"+id);
  }
 
  saveOrUpdate(info: Object): Observable<Object> {
  
    return this.http.post(HOST_URL.HOST+"/api/LLlivrs/", info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(HOST_URL.HOST+"/api/LLlivrs/"+id, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(HOST_URL.HOST+"/api/LLlivrs/"+id, { responseType: 'text' });
  }

  getAll(id: number): Observable<any> {
    return this.http.get(HOST_URL.HOST+"/api/LLlivrs/");
  }
  
}
