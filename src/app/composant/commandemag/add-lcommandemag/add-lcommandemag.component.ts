
import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/model/article';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import { NgForm } from '@angular/forms';
import { LcommandeMag } from 'src/app/model/lcommandemag';
import { CommandemagService } from 'src/app/services/commandemag.service';
import { LcommandemagService } from 'src/app/services/lcommandemag.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-add-lcommandemag',
  templateUrl: './add-lcommandemag.component.html',
  styleUrls: ['./add-lcommandemag.component.css']
})
export class AddLcommandemagComponent implements OnInit {
  formData: FormGroup;
  articleList:Article[];
  isValid:boolean=true;
  wtotht = 0;
  wtottva = 0;
  wtotttc = 0;
  mag = JSON.parse(localStorage.getItem('libmag')).id;
  article='';
  constructor( public service:LcommandemagService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddLcommandemagComponent>,
        private articleService:ArticleService,
        private commandeService:CommandemagService,public fb: FormBuilder){}
        get f() { return this.formData.controls; }
       

  ngOnInit() {
    if(this.data.lcommandeIndex==null)
    {
      this.InfoForm();
    }
    else 
    {
     this.formData =this.fb.group(Object.assign({},this.commandeService.list[this.data.lcommandeIndex]));
    }
  /* this.articleService.getAll1().subscribe(
      response =>{this.articleList= response;}
     );*/
}
chercher(){
  this.articleService.getAllpts(this.article,this.mag)
    .subscribe(
      response =>{
        this.articleList = response;
        this.toastr.success('Le produit est bien chargé');
        console.log(this.articleList)},error =>{
          this.toastr.error('Il y a eu une erreu veuillez reessayer plutard');
        }
    );
}


InfoForm() {
  this.formData = this.fb.group({
      id: null,
      numero :this.data.numero,
      qte : 0,
      pmin : 0,
      pmax : 0,
      pu : 0,
      tva : 0,
      totht : 0,
      tottva :0,
      totttc :0,
      libart :'',
      code_article :'',
      comm_id : this.data.id_commande,
      
    });
  } 
selectPrice(ctrl){
  if(ctrl.selectedIndex == 0){
    this.f['pmin'].setValue(0);
    this.f['pmax'].setValue(0);
    this.f['pu'].setValue(0);
    this.f['tva'].setValue(0);
    this.f['libart'].setValue('');
    this.f['qte'].setValue(0);
  }
  else{
    this.f['pmin'].setValue(this.articleList[ctrl.selectedIndex-1].pmin);
    this.f['pmax'].setValue(this.articleList[ctrl.selectedIndex-1].pmax);
    this.f['pu'].setValue(this.articleList[ctrl.selectedIndex-1].pv);
    this.f['tva'].setValue(this.articleList[ctrl.selectedIndex-1].tva);
    this.f['libart'].setValue(this.articleList[ctrl.selectedIndex - 1].libelle);
    this.f['code_article'].setValue( this.articleList[ctrl.selectedIndex - 1].code);
  }
  this.cal();
}

cal(){
 
  this.wtotht =  parseFloat((this.formData.value.qte * this.formData.value.pu).toFixed(3));
  this.wtottva = parseFloat(((this.wtotht * this.formData.value.tva)*0.01).toFixed(3)); 
  this.wtotttc = parseFloat((this.wtotht + this.wtottva).toFixed(3));
  this.f['totht'].setValue(this.wtotht);
  this.f['tottva'].setValue(this.wtottva);
  this.f['totttc'].setValue(this.wtotttc);
}

onSubmit() {
  
  if(this.data.lcommandeIndex==null)
  {
    
    this.commandeService.list.push(this.formData.value)
    this.dialogRef.close();
  }
  else
{
  
  this.commandeService.list[this.data.lcommandeIndex] = this.formData.value;
}
this.dialogRef.close();

 
}

validateForm(formData:LcommandeMag){
  this.isValid=true;
  if(formData.code_article=='')
    this.isValid=false;
    else if(formData.qte ==0)
    this.isValid=false;
    return this.isValid;
}
}
