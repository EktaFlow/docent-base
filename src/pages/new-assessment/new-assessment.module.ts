import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAssessmentPage } from './new-assessment';

@NgModule({
  declarations: [
    NewAssessmentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAssessmentPage),
  ],
})
export class NewAssessmentPageModule {}
