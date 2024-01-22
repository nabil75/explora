import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, TranslateModule
  ],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  // language='fr';

  // constructor(
  //   private translate: TranslateService,
  //   )
  //   {
  //     translate.setDefaultLang('fr');

  //   }

ngOnInit(){

}

ngAfterViewInit(){

}


// changeLanguage(): void {
//   if(this.language === 'fr'){
//     this.language ='en';
//   } 
//   if(this.language === 'en'){
//     this.language ='fr';
//   } 
//   this.translate.use(this.language)
// }
}
