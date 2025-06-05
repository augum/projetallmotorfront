
import { Component, OnInit } from '@angular/core';
import { BcommandeService } from 'src/app/services/bcommande.service';
import { Router, NavigationExtras } from '@angular/router';
import { BCommande } from 'src/app/model/bcommande';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bcommdepot',
  templateUrl: './bcommdepot.component.html',
  styleUrls: ['./bcommdepot.component.css']
})
export class BcommdepotComponent implements OnInit {
  commandeListe;
  p: number = 1;
  datej;
  formtemplate = new FormGroup({
    date1: new FormControl(),
    
  })
  constructor(private service :BcommandeService,private router:Router,public fb: FormBuilder,private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.bcomm();
  }
 
  bcomm(){
    this.datej = this.transformDate(new Date(Date.now()));
    this.service.getAll3(this.datej).subscribe(
      response =>{this.commandeListe = response;
        console.log(this.commandeListe);
        
      }
      
     );
  }
  chercher(formValue){
    
    this.service.getAll4(formValue.date1).subscribe(
      response =>{this.commandeListe = response;
        console.log(formValue.date1);
      }
     );
}
  newComm()
  {
    this.service.choixmenu ="A"
    this.router.navigate(['/bcommande']);
  }
  onSelect(comm){
    let navigationExtras: NavigationExtras={
      queryParams:{
        special:btoa(JSON.stringify(comm))
      }
    };
    this.router.navigate(['updatebcommande'],navigationExtras);
  }
  get formControls(){
    return this.formtemplate['controls'];
  }
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
