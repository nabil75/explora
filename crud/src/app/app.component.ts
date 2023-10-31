import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  language='fr';

  constructor(
    private translate: TranslateService,
    )
    {
      translate.setDefaultLang('fr');

    }

ngOnInit(){

}

ngAfterViewInit(){

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
