import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatMenu } from '@angular/material/menu';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  language='fr';

  constructor(private translate: TranslateService ){
    translate.setDefaultLang('fr');
  }

  changeLanguage(): void {

    if(this.language === 'fr'){
      this.language ='en';
    } else {
      this.language = 'fr'
    }
    this.translate.use(this.language)
  }

}
