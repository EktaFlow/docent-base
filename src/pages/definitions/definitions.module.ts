import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefinitionsPage } from './definitions';

@NgModule({
  declarations: [
    DefinitionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DefinitionsPage),
  ],
})
export class DefinitionsPageModule {}
