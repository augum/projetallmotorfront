import { Component, OnInit } from '@angular/core';
import { TauxService } from 'src/app/services/taux.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-taux',
  templateUrl: './taux.component.html',
  styleUrls: ['./taux.component.css']
})
export class TauxComponent implements OnInit {
public taxes;
  constructor(private tauxService:TauxService,private toastr: ToastrService,private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    this.getTaux();
  }
  getTaux(){
    this.tauxService.getTaux()
       .subscribe(data=>{
         this.taxes = data;
         console.log(this.taxes);
       }, err=>{
          console.log(err);
       })
  }
  modifier(taxe){
    let navigationExtras: NavigationExtras={
      queryParams:{
        special:btoa(JSON.stringify(taxe))
      }
    };
    this.router.navigate(['updatetaux'],navigationExtras);
  }
}
