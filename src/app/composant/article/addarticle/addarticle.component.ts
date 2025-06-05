import { Component, OnInit,Inject } from '@angular/core';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/services/categorie.service';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { MatDialogConfig, MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/categorie';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css']
})
export class AddarticleComponent implements OnInit {
  isSubmitted:boolean;
  public categories;
  public magasins;
  public cat:Categorie;
  public scategories;
  public idmag;
  public nommag;
  public complefac;
  formtemplate = new FormGroup({
    id: new FormControl(),
    code: new FormControl(),
    libelle: new FormControl('',Validators.required),
    pa: new FormControl('',Validators.required),
    codeCateg: new FormControl('',Validators.required),
    codeScateg: new FormControl(),
    idMagasin: new FormControl('',Validators.required),
    local: new FormControl(),
  })
  constructor(private dialog:MatDialog,private articleService:ArticleService,private scategorieservice:SouscategorieService,private toastr: ToastrService,
    private categorieService:CategorieService, private magasinService:MagasinService,
    @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddarticleComponent>) { }

  ngOnInit(): void {
    //this.getsousCategorie();
    this.getCategorie();
    this.getMagasin();
    this.idmag = JSON.parse(localStorage.getItem('libmag')).id;
    this.nommag = JSON.parse(localStorage.getItem('libmag')).libelle;
  }
  addArticle(formValue){
    this.isSubmitted= true;
    this.complefac = new Date().getHours()+new Date().getFullYear() + new Date().getDate()+new Date().getMilliseconds() +localStorage.getItem('magasin').replace(/[aeiouyAEIOUY]/g,"").toUpperCase();
  
    if(this.formtemplate.valid){
      formValue.code = formValue.libelle.replace(/[aeiouyAEIOUY]/g,"").toUpperCase()+new Date().getTime();
      formValue.stkajouter = formValue.stock;
      formValue.id = this.complefac;
      console.log(formValue);
      this.articleService.addAricle(formValue)
      .subscribe(data=>{
        this.toastr.success('Article enregistrée avec succès');
        this.ressetForm();
     }, error => {
      console.log(error);
      this.toastr.error('Erreur','Article non enregistrée');
    })
  };
  this.dialogRef.close();
}
get formControls(){
  return this.formtemplate['controls'];
}
ressetForm(){
  this.formtemplate.reset();
  this.formtemplate.setValue({
   id:'',
   code:'',
   libelle:'',
   pa:'',
   codeCateg:'',
   codeScateg:'',
   idMagasin:'',
   local:'',
  });
}
getCategorie(){
  this.categorieService.getCategorie()
     .subscribe(data=>{
       this.categories = data;
       console.log(this.categories);
     }, err=>{
        console.log(err);
     })
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
getsousCategorie(){
  this.scategorieservice.getSCategorie()
     .subscribe(data=>{
       this.scategories = data;
       console.log(this.scategories);
     }, err=>{
        console.log(err);
     })
}
onSelectCateg(code_categ: string){
  console.log(this.cat);
  this.scategorieservice.getdata(code_categ)
  .subscribe(data=>{
    this.scategories = data;
    console.log(this.scategories)
  }, err=>{
     console.log(err);
  })
}
}
