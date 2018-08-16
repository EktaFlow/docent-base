import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { NavigatePage } from './navigate';

@NgModule({
  declarations: [
    NavigatePage,
  ],
  imports: [
    IonicPageModule.forChild(NavigatePage),
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NavigatePageModule {}
