import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAssessmentPage } from './edit-assessment';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditAssessmentPage,
  ],
  imports: [
  IonicPageModule.forChild(EditAssessmentPage),
  ComponentsModule
    ],
    entryComponents: [EditAssessmentPage],
    exports: [
      EditAssessmentPage
    ]
})
export class EditAssessmentPageModule {}
