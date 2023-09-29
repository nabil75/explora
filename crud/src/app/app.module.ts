import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialExampleModule} from '../material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewQuestionnaryComponent } from './new-questionnary/new-questionnary.component';
import { MyQuestionnaryComponent } from './my-questionnary/my-questionnary.component';
import { ListUserComponent } from './list-user/list-user.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { } from '@angular/material';
import { FermeeSimpleComponent } from './fermee-simple/fermee-simple.component';
import { FermeeMultipleComponent } from './fermee-multiple/fermee-multiple.component';
import { AdQuestionDirective } from './directives/ad-question.directive';
import { EventEmitterService } from './services/event-emitter.service';
import { DestroyComponentDirective } from './directives/destroy-component.directive';
import { ModaliteSimpleComponent } from './modalites/modalite-simple/modalite-simple/modalite-simple.component';
import { ModaliteAutreComponent } from './modalites/modalite-autre/modalite-autre/modalite-autre.component';
import { ModaliteNcComponent } from './modalites/modalite-nc/modalite-nc/modalite-nc.component';
import { ModaliteNspComponent } from './modalites/modalite-nsp/modalite-nsp/modalite-nsp.component';
import { IndexedDbService } from './services/indexed-db.service';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BranchementModalComponent } from './modal/branchement/branchement-modal/branchement-modal.component';
import { ApiService } from './api/api.service';
import { DynamicComponentService } from './services/dynamic-component.service';
import { OrganizationChartBasicDocComponent } from './orgranigramme/organization-chart-basic-doc/organization-chart-basic-doc.component';

// Import PrimeNG modules
import { OrganizationChartModule } from 'primeng/organizationchart';





@NgModule({
  declarations: [
    AppComponent,
    NewQuestionnaryComponent,
    MyQuestionnaryComponent,
    ListUserComponent,
    FermeeSimpleComponent,
    FermeeMultipleComponent,
    AdQuestionDirective,
    DestroyComponentDirective,
    ModaliteSimpleComponent,
    ModaliteAutreComponent,
    ModaliteNcComponent,
    ModaliteNspComponent,
    BranchementModalComponent,
    OrganizationChartBasicDocComponent,

  ],
  imports: [
    //primeng
    OrganizationChartModule,


    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'myCookieName',
      headerName: 'X-CSRFToken'
    }),
    BrowserAnimationsModule,
    MaterialExampleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    DragDropModule,


    

  ],
  providers: [EventEmitterService, IndexedDbService, ApiService, DynamicComponentService ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],

})
export class AppModule {

}

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
