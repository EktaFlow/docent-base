import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionitemsPage } from './actionitems';

@NgModule({
  declarations: [
    ActionitemsPage,

  ],
  imports: [
    IonicPageModule.forChild(ActionitemsPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ActionitemsPageModule {}
