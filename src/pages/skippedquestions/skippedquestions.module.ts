import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkippedquestionsPage } from './skippedquestions';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SkippedquestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SkippedquestionsPage),
		ComponentsModule
  ],
})
export class SkippedquestionsPageModule {}
