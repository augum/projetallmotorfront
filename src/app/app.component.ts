import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'projetcommercial';

  constructor(private translate:TranslateService){}

  ngOnInit(): void {
    this.translate.addLangs(['en','fr']);
    if(localStorage.getItem('language')){
      this.translate.setDefaultLang(localStorage.getItem('language'));
      this.translate.use(localStorage.getItem('language'));
    }else{
      this.translate.setDefaultLang('fr');
      this.translate.use('fr');
      localStorage.setItem('language','fr');
    }
  }
}
