import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlcommandeService } from 'src/app/services/blcommande.service';

@Component({
  selector: 'app-updatebcommande',
  templateUrl: './updatebcommande.component.html',
  styleUrls: ['./updatebcommande.component.css']
})
export class UpdatebcommandeComponent implements OnInit {
  public data;
  public lcoms;
  p: number = 1;
  constructor(private service:BlcommandeService,private activatedRoute: ActivatedRoute,private route:Router,private toastr: ToastrService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(atob(params.special));
         console.log(this.data);
      }
    });
   }

  ngOnInit(): void {
    console.log(this.data.numero);
    this.service.getAll(this.data.numero)
       .subscribe(data=>{
         this.lcoms = data;
         console.log(this.lcoms)
         
       }, err=>{
          console.log(err);
       })
  }

}
