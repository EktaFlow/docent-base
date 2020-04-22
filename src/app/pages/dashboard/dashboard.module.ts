import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
// import {TopbarComponent} from '../../components/topbar/topbar.component'
// console.log(TopbarComponent);

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // TopbarComponent,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage],
  exports: [DashboardPage]
})
export class DashboardPageModule {}
