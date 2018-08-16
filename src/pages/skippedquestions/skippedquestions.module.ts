import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { SkippedquestionsPage } from './skippedquestions';

@NgModule({
  declarations: [
    SkippedquestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SkippedquestionsPage),
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SkippedquestionsPageModule {}
