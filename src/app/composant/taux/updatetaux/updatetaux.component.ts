import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TauxService } from 'src/app/services/taux.service';

@Component({
  selector: 'app-updatetaux',
  templateUrl: './updatetaux.component.html',
  styleUrls: ['./updatetaux.component.css']
})
export class UpdatetauxComponent implements OnInit {
  public data;
  constructor(private activatedRoute: ActivatedRoute,private route:Router,private toastr: ToastrService,private tauxservice:TauxService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(atob(params.special));
        console.log(this.data);
      }
    });
  }

  ngOnInit(): void {
  }
  modifier(){
    let url=this.data._links.taxe.href
       this.tauxservice.updatetaux(url,this.data)
         .subscribe(data=>{
           this.route.navigate(['taux']);
           this.toastr.success('utilisateur modifiée avec succès');
         }, error => {
          this.toastr.warning('Modification non effectuée');
           console.log(error);
         })
  }
}
