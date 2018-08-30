import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriteriaPage } from './criteria';

@NgModule({
  declarations: [
    CriteriaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriteriaPage),
  ],
})
export class CriteriaPageModule {}
