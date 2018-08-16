import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { DefinitionsPage } from './definitions';

@NgModule({
  declarations: [
    DefinitionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DefinitionsPage),
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DefinitionsPageModule {}
