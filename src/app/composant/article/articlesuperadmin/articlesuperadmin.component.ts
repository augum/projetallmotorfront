import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { AddarticleComponent } from '../addarticle/addarticle.component';
import pdfMake from 'pdfmake/build/pdfmake';
import {map} from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Article } from 'src/app/model/article';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MagasinService } from 'src/app/services/magasin.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-articlesuperadmin',
  templateUrl: './articlesuperadmin.component.html',
  styleUrls: ['./articlesuperadmin.component.css']
})
export class ArticlesuperadminComponent implements OnInit {
 public articles;
 p: number = 1;
 isSubmitted:boolean;
 public magasins;
 public qte:number = 0;
 formtemplate = new FormGroup({
  nom: new FormControl(),  
  mag: new FormControl(),  
})
  constructor(private articleService:ArticleService,private toastr: ToastrService,private dialog:MatDialog,private router:Router,private magasinService:MagasinService) { }

  ngOnInit(): void {
    //this.getArticle();
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
  getArticle(){
    this.articleService.getArticle()
       .subscribe(data=>{
         this.articles = data;
         
         console.log(this.articles)
         
       }, err=>{
          console.log(err);
       })
  }
  chercher(formvalue){
    console.log(formvalue);
    this.isSubmitted= true;
    this.articleService.getAllpts(formvalue.nom,formvalue.mag)
      .subscribe(
        response =>{this.articles = response;}
      );
  }
  get formControls(){
    return this.formtemplate['controls'];
  }
  getData() {
    this.articleService.getAll1().subscribe(
      response =>{this.articleService.listData = response;console.log(this.articleService.listData)}
     );
   
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.dialog.open(AddarticleComponent,dialogConfig).afterClosed().subscribe(b10=>{
      this.getData();
      
    });
   }
   onDelete(id: number) {
   
    if (window.confirm('Etes vous sûr de vouloir supprimer cet article?')) {
      this.articleService.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' Article supprimé avec succès!'); 
            this.getArticle();
          },
          error => console.log(error));
    }
  }
   modifier(article){
    /*let navigationExtras: NavigationExtras={
      queryParams:{
        special:btoa(JSON.stringify(article))
      }
    };
    this.router.navigate(['updatearticle'],navigationExtras);*/
    
    let url=article.id
    if(this.qte != null ){
      
      article.stock = article.stock + this.qte;
      article.stkinit = article.stock - this.qte;
      article.stkajouter = this.qte;
      if(article.stock > article.fodec){
        article.dispo = true;
      }
      else{
        article.dispo = false;
       }
      
         this.articleService.updateArticle(url,article)
           .subscribe(data=>{
             
             this.toastr.success('Article modifiée avec succès');
           }, error => {
            this.toastr.error('Article non modifié');
             console.log(error);
           });
           this.qte=0;
    }else{
      this.articleService.updateArticle(url,article)
           .subscribe(data=>{
             this.toastr.success('Article modifiée avec succès');
           }, error => {
            this.toastr.error('Article non modifié');
             console.log(error);
           });
           this.qte=0;

    }
    
 }
 generatePdf(){
    const documant =this.getDocument();
    pdfMake.createPdf(documant).open();
 }
 getDocument(){
   return{
     content:[
       
        
        {
          text:new Date().toLocaleDateString(),
          alignment:'right'
        },
        {
          text:new Date().toLocaleTimeString(),
          alignment:'right'
        },
        {
          text:'PHARMACIE BBN',
          style:'name'
        }, 
        
       {
         text:'Liste des médicaments',
         bold:true,
         fontSize:20,
         alignment:'center',
         margin:[0,0,0,20]
       },

       this.getList(this.articleService.listData),
       {

       },
       {
         text:'Signature',
         style:'sign',
         alignment:'right'
       },
       
     ],
     styles:{
       header:{
         fontSize: 18,
         bold:true,
         margin:[0,20,0,10],
         decoration:'underline'
       },
       name:{
         fontsize: 16,
         bold:true
       },
       total:{
         fontSize:12,
         bold:true,
         italics:true
       },
       ligne:{
        fontSize:12,
        bold:true,
        italics:true
      },
       sign:{
         margin:[0,50,0,10],
         alignment:'right',
         italics:true
       },
       tableHeader:{
         bold:true,
         fontSize:15,
         alignment:'center'
       }
     }
   }
 }
 getList(items: Article[]){
     return{
       table:{
          widths:['*','*','*','*','*'],
          body:[
            [
            {
              text:'Designation',
              style:'tableHeader'
            },
            {
              text:'Prix achat',
              style:'tableHeader'
            },
            {
              text:'Prix vente',
              style:'tableHeader'
            },
            {
              text:'Tva',
              style:'tableHeader'
            },
            {
              text:'Qte',
              style:'tableHeader'
            },
            
            ],
            ...items.map(ed=>{
              return[ed.libelle,ed.pa,ed.pv,ed.tva,ed.stock];
            })
          ]
       }
     }
 }
}
