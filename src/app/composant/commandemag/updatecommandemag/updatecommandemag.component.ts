import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LcommandemagService } from 'src/app/services/lcommandemag.service';

@Component({
  selector: 'app-updatecommandemag',
  templateUrl: './updatecommandemag.component.html',
  styleUrls: ['./updatecommandemag.component.css']
})
export class UpdatecommandemagComponent implements OnInit {
  public data;
  public lcoms;
  p: number = 1;
  constructor(private service:LcommandemagService,private activatedRoute: ActivatedRoute,private route:Router,private toastr: ToastrService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(atob(params.special));
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
