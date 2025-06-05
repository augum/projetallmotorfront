import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-modifprigenarticle',
  templateUrl: './modifprigenarticle.component.html',
  styleUrls: ['./modifprigenarticle.component.css']
})
export class ModifprigenarticleComponent implements OnInit {
  public libelle:any;
  public pmin;
  public pmax;
  public pv;
  public data;
  public articles=[];
  public options ;
  formtemplate = new FormGroup({
    
    pmin: new FormControl('',Validators.required),
    pmax: new FormControl('',Validators.required),
    pv: new FormControl('',Validators.required),
    
  });
  formGroup : FormGroup;
  constructor(private articledisct:ArticleService,private toastr: ToastrService,private activatedRoute: ActivatedRoute,
    private fb : FormBuilder) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(atob(params.special));
        console.log(this.data);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.getArticle();
  }
  initForm(){
    this.formGroup = this.fb.group({
      'article' : ['']
    })

    this.formGroup.get('article').valueChanges.subscribe(response => {
        console.log(response);
        this.filterData(response);
    })
  }

  filterData(enteredData){
    this.options = this.articles.filter(item =>{
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
  modifprix(formValue){
    console.log(this.libelle)
    this.articledisct.updateArticleP(this.data.libelle,formValue)
           .subscribe(data=>{
             this.toastr.success('Le prix de du produit '+ this.data.libelle + ' effectuée avec succès' );
             this.ressetForm();
           }, error => {
            this.toastr.error('Article non modifié');
            this.ressetForm();
             console.log(error);
           })
           
  }
  ressetForm(){
    this.formtemplate.reset();
    this.formtemplate.setValue({
     
    
     pmin:'',
     pmax:'',
     pv:'',
     
    });
  }
  getArticle(){
    this.articledisct.getDistinct()
       .subscribe(data=>{
         this.articles = data;
         this.options = data;
         console.log(this.articles);
       }, err=>{
          console.log(err);
       })
  }
}
