import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-listegenarticle',
  templateUrl: './listegenarticle.component.html',
  styleUrls: ['./listegenarticle.component.css']
})
export class ListegenarticleComponent implements OnInit {
  public articles;
  p: number = 1;
  public name;
  public data;
  article='';
  constructor(private articleService:ArticleService,private router:Router,private activatedRoute: ActivatedRoute,private toastr: ToastrService) {
    
   }

  ngOnInit(): void {
    //this.getArticle();
    this.chercher();
    
  }
  getArticle(){
    this.articleService.getDistinct()
       .subscribe(data=>{
         this.articles = data;
         console.log(this.articles);
       }, err=>{
          console.log(err);
       })
  }
  chercher(){
    this.articleService.getAllpts2()
      .subscribe(
        response =>{
          this.articles = response;
          
          console.log(this.articles)},error =>{
            
          }
      );
  }
  modifier(article){
   /**  let navigationExtras: NavigationExtras={
      queryParams:{
        special:btoa(JSON.stringify(article))
      }
    };
    this.router.navigate(['prixmodgen'],navigationExtras);*/
    
    this.articleService.updateArticle(article.id,article)
           .subscribe(data=>{
             this.toastr.success('Le prix du produit '+ article.libelle + ' effectuée avec succès' );
             this.chercher();
             
           }, error => {
            this.toastr.error('Article non modifié');
            
             console.log(error);
           })

           
 }
}
