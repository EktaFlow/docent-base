import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewPage } from './review';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewPage),
		ComponentsModule
  ],
  entryComponents: [
    ReviewPage
  ],
  exports: [
    ReviewPage
  ]
})
export class ReviewPageModule {}
