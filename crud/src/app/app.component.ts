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
    private translate: TranslateService) { translate.setDefaultLang('fr');}

ngOnInit(){}

ngAfterViewInit(){}


switchToEnglish(): void {
  this.language ='en';
  this.translate.use(this.language)
}

switchToFrench(): void {
  this.language ='fr';
  this.translate.use(this.language)
}
}
