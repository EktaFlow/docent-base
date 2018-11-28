import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionitemsPage } from './actionitems';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ActionitemsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionitemsPage),
		ComponentsModule
  ],
  entryComponents: [
    ActionitemsPage
  ],
  exports: [
    ActionitemsPage
  ]
})
export class ActionitemsPageModule {}
