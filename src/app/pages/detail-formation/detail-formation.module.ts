import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailFormationPageRoutingModule } from './detail-formation-routing.module';

import { DetailFormationPage } from './detail-formation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailFormationPageRoutingModule
  ],
  declarations: [DetailFormationPage], 
  exports : [DetailFormationPage], 
})
export class DetailFormationPageModule {}
