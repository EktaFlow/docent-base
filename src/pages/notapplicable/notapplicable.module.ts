import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { NotapplicablePage } from './notapplicable';

@NgModule({
  declarations: [
    NotapplicablePage,
  ],
  imports: [
    IonicPageModule.forChild(NotapplicablePage),
    CommonModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NotapplicablePageModule {}
