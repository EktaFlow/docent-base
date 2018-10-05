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
})
export class ActionitemsPageModule {}
