import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { MaterialExampleModule} from '../material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { } from '@angular/material';
import { EventEmitterService } from './services/event-emitter.service';
import { IndexedDbService } from './services/indexed-db.service';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ApiService } from './api/api.service';
import { DynamicComponentService } from './services/dynamic-component.service';
import { RouterModule } from '@angular/router';

// Import PrimeNG modules
import { OrganizationChartModule } from 'primeng/organizationchart';
import { Routes } from '@angular/router';
import { NewQuestionnaryComponent } from './new-questionnary/new-questionnary.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

const routes: Routes = [
  // { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: '', 
    loadComponent: () => import('./accueil/accueil.component').then(module => module.AccueilComponent)
  },
  { 
    path: 'accueil', 
    loadComponent: () => import('./accueil/accueil.component').then(module => module.AccueilComponent)
  },
  { 
    path:'',
    loadChildren: () => import('./new-questionnary/new-questionnary.routes').then(module => module.newQuestionnaryRoutes)
  },
  { 
    path:'',
    loadChildren: () => import('./edit/edit-questionnary/edit-questionnary.routes').then(module => module.editQuestionnaryRoutes)
  },
  { 
    path:'',
    loadChildren: () => import('./my-questionnary/my-questionnary.routes').then(module => module.myQuestionnaryRoutes)
  },
  { 
    path:'',
    loadChildren: () => import('./explore/resultat-simple/resultat-simple.routes').then(module => module.resultatSimpleRoutes)
  },
  { path: 'list-user', 
    loadComponent: () => import('./list-user/list-user.component').then(module => module.ListUserComponent)
  },
  { path: 'fermee-simple', 
    loadComponent: () => import('./fermee-simple/fermee-simple.component').then(module => module.FermeeSimpleComponent)
  },
  { path: 'fermee-multiple', 
    loadComponent: () => import('./fermee-multiple/fermee-multiple.component').then(module => module.FermeeMultipleComponent)
  },
  { path: 'organigramme', 
    loadComponent: () => import('./z-divers/organization-chart-basic-doc/organization-chart-basic-doc.component').then(module => module.OrganizationChartBasicDocComponent)
  },
  { path: 'gauge', 
  loadComponent: () => import('./z-divers/gauge/gauge.component').then(module => module.GaugeComponent)
},
];

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
  
  ],
  imports: [
    //primeng
    OrganizationChartModule,
    BrowserModule,
    CommonModule,
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
    RouterModule.forRoot(routes)
  ],
  providers: [EventEmitterService, IndexedDbService, ApiService, DynamicComponentService, NewQuestionnaryComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],

})
export class AppModule {

}

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
