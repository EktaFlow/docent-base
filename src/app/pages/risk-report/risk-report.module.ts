import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

import { RiskReportPage } from './risk-report.page';

const routes: Routes = [
  {
    path: '',
    component: RiskReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RiskReportPage],
  exports: [RiskReportPage]
})
export class RiskReportPageModule {}
