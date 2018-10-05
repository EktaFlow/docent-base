import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotapplicablePage } from './notapplicable';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NotapplicablePage,
  ],
  imports: [
    IonicPageModule.forChild(NotapplicablePage),
		ComponentsModule
  ],
})
export class NotapplicablePageModule {}
