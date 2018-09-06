import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDashboardPage } from './user-dashboard';

@NgModule({
  declarations: [
    UserDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDashboardPage),
  ],
})
export class UserDashboardPageModule {}
