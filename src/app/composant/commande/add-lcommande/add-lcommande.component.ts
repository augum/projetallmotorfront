import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/model/article';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import { NgForm } from '@angular/forms';
import { Lcommande } from 'src/app/model/lcommande';
import { CommandeService } from 'src/app/services/commande.service';
import { LcommandeService } from 'src/app/services/lcommande.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-lcommande',
  templateUrl: './add-lcommande.component.html',
  styleUrls: ['./add-lcommande.component.scss']
})
export class AddLcommandeComponent implements OnInit {
  formData: FormGroup;
  public rowIndexArray:any[];
  articleList:Article[];
  articleList1=[];
  filteredOptions: Observable<string[]>;
  selected=[];
  article='';
  isValid:boolean=true;
  mag = JSON.parse(localStorage.getItem('libmag')).id;
  wtotht = 0;
  wtottva = 0;
  wtotttc = 0;
  constructor( public service:LcommandeService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddLcommandeComponent>,
        private articleService:ArticleService,
        private commandeService:CommandeService,public fb: FormBuilder){}
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
   // this.getArticle();
   
   }

getArticle(){
  this.articleService.getAll11().subscribe(
    response =>{
      this.articleList= response;
      
      console.log(this.articleList)}
   );
}

InfoForm() {
  this.formData = this.fb.group({
      id: null,
      numero :this.data.numero,
      qte : 0,
      pmin : 0,
      pmax : 0,
      stock : 0,
      pu : 0,
      tva : 0,
      local:'',
      totht : 0,
      tottva :0,
      totttc :0,
      libart :'',
      idMagasin:'',
      code_article :'',
      comm_id : this.data.id_commande,
      
    });
  } 
selectPrice(ctrl){
  console.log(ctrl);
  if(ctrl.selectedIndex == 0){
    this.f['pmin'].setValue(0);
    this.f['pmax'].setValue(0);
    this.f['stock'].setValue(0);
    this.f['pu'].setValue(0);
    this.f['local'].setValue(0);
    this.f['idMagasin'].setValue('');
    this.f['tva'].setValue(0);
    this.f['libart'].setValue('');
    this.f['qte'].setValue(0);
  }
  else{
    this.f['pmin'].setValue(this.articleList[ctrl.selectedIndex-1].pmin);
    this.f['pmax'].setValue(this.articleList[ctrl.selectedIndex-1].pmax);
    this.f['stock'].setValue(this.articleList[ctrl.selectedIndex-1].stock);
    this.f['pu'].setValue(this.articleList[ctrl.selectedIndex-1].pv);
    this.f['local'].setValue(this.articleList[ctrl.selectedIndex-1].local);
    this.f['idMagasin'].setValue(this.articleList[ctrl.selectedIndex-1].idMagasin);
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
  if(this.formData.value.pu < this.formData.value.pmin ){
    this.toastr.error('Le prix de vente doit etre inferieur au prix minimum');
    return;
  }else{
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
  this.toastr.success('La ligne de commande a été ajoutée avec succès');
  this.formData.reset();
  this.InfoForm();
  this.getArticle();
}

validateForm(formData:Lcommande){
  this.isValid=true;
  if(formData.code_article=='')
    this.isValid=false;
    else if(formData.qte ==0)
    this.isValid=false;
    return this.isValid;
}
filterMenaces(str: string) {
  if (typeof str === 'string') {
      this.articleList = this.articleList1.filter(a => a.toLowerCase()
                                           .startsWith(str.toLowerCase())); 
  }
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
}
