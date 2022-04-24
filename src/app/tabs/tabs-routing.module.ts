import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'formation',
        children : [
          {
            path : '',
            loadChildren: () => import('../pages/formation/formation.module').then(m => m.FormationPageModule)
          },
          {
            path: 'home/tabs/detail/:id',
            loadChildren: () => import('../pages/detail-formation/detail-formation.module').then( m => m.DetailFormationPageModule)
          },
        ]
      },
      {
        path: 'tab2/:id',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },{
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
