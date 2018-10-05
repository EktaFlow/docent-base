import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqsPage } from './faqs';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FaqsPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqsPage),
		ComponentsModule
  ],
})
export class FaqsPageModule {}
