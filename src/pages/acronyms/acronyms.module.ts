import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcronymsPage } from './acronyms';

@NgModule({
  declarations: [
    AcronymsPage,
  ],
  imports: [
    IonicPageModule.forChild(AcronymsPage),
  ],
})
export class AcronymsPageModule {}
