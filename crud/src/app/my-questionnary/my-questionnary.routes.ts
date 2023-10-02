﻿import { Routes } from '@angular/router';

export const myQuestionnaryRoutes: Routes = [
    { 
      path: 'my-questionnary', 
      loadComponent: () => import('./my-questionnary.component').then(module => module.MyQuestionnaryComponent)
    },
]