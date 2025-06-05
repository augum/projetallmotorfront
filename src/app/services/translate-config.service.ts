import { Injectable } from '@angular/core';
import{TranslateService} from '@ngx-translate/core'
@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(private translateSrevice:TranslateService) { 

    this.translateSrevice.use('fr');

  }
  ChangerLalangue(type:string){
    this.translateSrevice.use(type);
  }
}
