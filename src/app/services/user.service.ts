import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import {User} from '../model/user';
import {HOST_URL} from '../config/host';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private baseUrl = '/api/users';
  private baseUrl1 = '/api/users/5';
  islogin = false;
  admin = false;
  suser = false;
  magasin = false;
  choixmenu : string  = 'A';
  listData : User[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  login(login: String): Observable<Object> {
    
     return this.http.get(HOST_URL.HOST+"/api/users/5/"+login);
   }  
 
  getData(id: number): Observable<Object> {
    return this.http.get(HOST_URL.HOST+"/api/users/"+id);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(HOST_URL.HOST+"/api/users/", info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(HOST_URL.HOST+"/api/users/"+id, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(HOST_URL.HOST+"/api/users/"+id, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(HOST_URL.HOST+"/api/users/");
  }
  getuser(){
    return this.http.get(HOST_URL.HOST+"/api/users/");
  }
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  public updateUser(url:string,user:User){
    return this.http.patch(url,user);
  }
}
