import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigatePage } from './navigate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NavigatePage,
  ],
  imports: [
    IonicPageModule.forChild(NavigatePage),
		ComponentsModule
  ],
  entryComponents: [
    NavigatePage
  ],
  exports: [
    NavigatePage
  ]
})
export class NavigatePageModule {}
