import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

import { UserDashboardPage } from './user-dashboard.page';

const routes: Routes = [
  { path: '', component: UserDashboardPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
	declarations: [UserDashboardPage],
  exports: [UserDashboardPage]
})
export class UserDashboardPageModule {}
