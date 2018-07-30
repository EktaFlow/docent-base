import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigatePage } from './navigate';

@NgModule({
  declarations: [
    NavigatePage,
  ],
  imports: [
    IonicPageModule.forChild(NavigatePage),
  ],
})
export class NavigatePageModule {}
