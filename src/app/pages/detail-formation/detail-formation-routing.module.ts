import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailFormationPage } from './detail-formation.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFormationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailFormationPageRoutingModule {}
