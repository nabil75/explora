import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  language='fr';
  img_accueil: string ="";

  constructor(
    private translate: TranslateService,
    private router: Router,)
    {
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
