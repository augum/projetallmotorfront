import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [SidemenuComponent],
  imports: [CommonModule,TranslateModule]
})
export class SidemenuModule { }
