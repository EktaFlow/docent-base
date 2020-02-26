import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsPage } from './questions';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    QuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsPage),
		ComponentsModule
  ],
  entryComponents: [
    QuestionsPage
  ],
  exports: [
    QuestionsPage
  ]
})
export class QuestionsPageModule {}
