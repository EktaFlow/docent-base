import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcronymsPage } from './acronyms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
	AcronymsPage,
		],
  imports: [
    IonicPageModule.forChild(AcronymsPage),
		ComponentsModule,
  ],
  entryComponents: [
    AcronymsPage
  ],
  exports: [
    AcronymsPage
  ]
})
export class AcronymsPageModule {}
