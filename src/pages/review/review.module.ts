import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { ReviewPage } from './review';

@NgModule({
  declarations: [
    ReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewPage),
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReviewPageModule {}
