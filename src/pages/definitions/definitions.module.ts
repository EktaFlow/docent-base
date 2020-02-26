import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefinitionsPage } from './definitions';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DefinitionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DefinitionsPage),
		ComponentsModule
  ],
  entryComponents: [
    DefinitionsPage
  ],
  exports: [
    DefinitionsPage
  ]
})
export class DefinitionsPageModule {}
