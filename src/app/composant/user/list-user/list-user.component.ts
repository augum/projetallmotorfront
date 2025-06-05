import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from '../register/register.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
 public users;
 p: number = 1;
  constructor(private userService:UserService,private dialog:MatDialog,private router:Router,private toastr :ToastrService) { }

  ngOnInit(): void {
    this.getuser();
  }
  getuser(){
    this.userService.getuser()
       .subscribe(data=>{
         this.users = data;
         
       }, err=>{
          console.log(err);
       })
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.dialog.open(RegisterComponent,dialogConfig).afterClosed().subscribe(b10=>{
      this.getuser();
      
    });
  }
  modifier(user){
    let navigationExtras: NavigationExtras={
      queryParams:{
        special:btoa(JSON.stringify(user))
      }
    };
    this.router.navigate(['updateuser'],navigationExtras);
  }

  onDelete(id: number) {
   
    if (window.confirm('Etes vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.success(' utilisateur supprimé avec succès!'); 
            this.getuser();
          },
          error => console.log(error));
    }
  }
}
