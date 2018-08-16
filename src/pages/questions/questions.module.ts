import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsPage } from './questions';

@NgModule({
  declarations: [
    QuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsPage),
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class QuestionsPageModule {}
