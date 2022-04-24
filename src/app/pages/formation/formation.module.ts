import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormationPageRoutingModule } from './formation-routing.module';

import { FormationPage } from './formation.page';
import { DetailFormationPage } from '../detail-formation/detail-formation.page';
import { DetailFormationPageModule } from '../detail-formation/detail-formation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormationPageRoutingModule, 
    DetailFormationPageModule, 
  ],
  declarations: [FormationPage], 
  entryComponents : [DetailFormationPage]
})
export class FormationPageModule {}
