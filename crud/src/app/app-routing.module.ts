import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewQuestionnaryComponent } from './new-questionnary/new-questionnary.component';
import { MyQuestionnaryComponent } from './my-questionnary/my-questionnary.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FermeeSimpleComponent } from './fermee-simple/fermee-simple.component';
import { FermeeMultipleComponent } from './fermee-multiple/fermee-multiple.component';
import { OrganizationChartBasicDocComponent } from './orgranigramme/organization-chart-basic-doc/organization-chart-basic-doc.component';



const routes: Routes = [
  { path: 'new-questionnary', component: NewQuestionnaryComponent },
  { path: 'edit-questionnary/:id', component: NewQuestionnaryComponent },
  { path: 'my-questionnary', component: MyQuestionnaryComponent},
  { path: 'list-user', component: ListUserComponent},
  { path: 'fermee-simple', component: FermeeSimpleComponent},
  { path: 'fermee-multiple', component: FermeeMultipleComponent},
  { path: 'organigramme', component: OrganizationChartBasicDocComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
