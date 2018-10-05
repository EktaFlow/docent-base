import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDashboardPage } from './user-dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDashboardPage),
		ComponentsModule
  ],
})
export class UserDashboardPageModule {}
