import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MagasinService } from 'src/app/services/magasin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  public data;
  public magasins;
  constructor(private activatedRoute: ActivatedRoute,private magasinService:MagasinService,private route:Router,private toastr: ToastrService,private userservice:UserService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(atob(params.special));
        
      }
    });
  }

  ngOnInit(): void {
    this.getMagasin();
  }
  getMagasin(){
    this.magasinService.getMagasin()
       .subscribe(data=>{
         this.magasins = data;
         console.log(this.magasins);
       }, err=>{
          console.log(err);
       })
  }
  modifier(){
    let url=this.data.id;
       this.userservice.updatedata(url,this.data)
         .subscribe(data=>{
           this.route.navigate(['userlist']);
           this.toastr.success('Modification effectuée avec succès');
         }, error => {
          this.toastr.warning('Modification non effectuée');
           console.log(error);
         })
  }
}
