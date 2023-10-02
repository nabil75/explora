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
import { DynamicViewComponent } from './dynamic-view/dynamic-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },

  { 
    path:'',
    // providers: [EventEmitterService, IndexedDbService, ApiService, DynamicComponentService],
    loadChildren: () => import('./new-questionnary/new-questionnary.routes').then(module => module.newQuestionnaryRoutes)
  },

  { 
    path:'',
    // providers: [EventEmitterService, ApiService],
    loadChildren: () => import('./my-questionnary/my-questionnary.routes').then(module => module.myQuestionnaryRoutes)
  },

  { path: 'divers', 
    loadComponent: () => import('./dynamic-view/dynamic-view.component').then(module => module.DynamicViewComponent)
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
    loadComponent: () => import('./orgranigramme/organization-chart-basic-doc/organization-chart-basic-doc.component').then(module => module.OrganizationChartBasicDocComponent)
  },

];



@NgModule({
  declarations: [
    AppComponent,
  
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
  providers: [EventEmitterService, IndexedDbService, ApiService, DynamicComponentService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],

})
export class AppModule {

}

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
