import { Component, OnInit } from '@angular/core';
import { LcommandeService } from 'src/app/services/lcommande.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LcommandefService } from 'src/app/services/lcommandef.service';

@Component({
  selector: 'app-listefs',
  templateUrl: './listefs.component.html',
  styleUrls: ['./listefs.component.css']
})
export class ListefsComponent implements OnInit {
  public listefs;
  isSubmitted:boolean;
  p: number = 1;
  formtemplate = new FormGroup({
    numero: new FormControl(''),  
  })
  constructor(private lservice:LcommandefService) { }

  ngOnInit(): void {
  }
 
  getfs(formvalue){
    this.lservice.getData1f(formvalue.numero)
       .subscribe(data=>{
         this.listefs = data;
         
       }, err=>{
          console.log(err);
       })
  }
}
