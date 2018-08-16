import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { FaqsPage } from './faqs';

@NgModule({
  declarations: [
    FaqsPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqsPage),
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FaqsPageModule {}
