import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { AcronymsPage } from './acronyms';
// import { TopbarComponent } from '../../components/topbar/topbar'

@NgModule({
  declarations: [
    AcronymsPage,
  ],
  imports: [
    IonicPageModule.forChild(AcronymsPage),
    CommonModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AcronymsPageModule {}
