import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriteriaPage } from './criteria';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CriteriaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriteriaPage),
		ComponentsModule
  ],
})
export class CriteriaPageModule {}
