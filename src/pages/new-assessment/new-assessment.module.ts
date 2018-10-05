import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAssessmentPage } from './new-assessment';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewAssessmentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAssessmentPage),
		ComponentsModule
  ],
})
export class NewAssessmentPageModule {}
