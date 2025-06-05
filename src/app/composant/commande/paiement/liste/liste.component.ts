import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Commande } from 'src/app/model/commande';
import { MatTableDataSource } from '@angular/material/table';
import { CommandeService } from 'src/app/services/commande.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
isSubmitted:boolean;
 public comms;
 p: number = 1;
 
 public inter:MatTableDataSource<Commande>;
  value: string;
  displayedColumns: string[] = ['numero', 'nomclient', 'total', 'montantp', 'reste'];
  //dataSource = new MatTableDataSource<Patient>(this.patients);
  //dataSource = this.patients;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  formtemplate = new FormGroup({
    nom: new FormControl('',Validators.required),  
  })
  constructor(private service :CommandeService,private router:Router) { }

  ngOnInit(): void {
    this.getActes();
    
  }
  private getActes(){
    this.service.getAllp()
      .subscribe(data=>{
        this.comms= data;
        this.inter = new MatTableDataSource(this.comms)
        this.inter.sort = this.sort;
        this.inter.paginator = this.paginator;
      }, error => {
        console.log(error);
      })
  }
  
   chercher(formvalue){
    this.isSubmitted= true;
    this.service.getAllpt(formvalue.nom)
      .subscribe(data=>{
        this.comms= data;
        
        this.inter = new MatTableDataSource(this.comms)
        this.inter.sort = this.sort;
        this.inter.paginator = this.paginator;
      }, error => {
        console.log(error);
      })
  }
get formControls(){
  return this.formtemplate['controls'];
}
payer(comm){
  let navigationExtras: NavigationExtras={
    queryParams:{
      special:btoa(JSON.stringify(comm))
    }
  };
  this.router.navigate(['payerfacture'],navigationExtras);
}
}
