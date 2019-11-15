import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TopbarComponent } from "../../app/topbar/topbar.component";
import {ReportInfoCardComponent} from '../../app/report-info-card/report-info-card.component';

import { IonicModule } from '@ionic/angular';

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
    TopbarComponent,
    ReportInfoCardComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [RiskReportPage]
})
export class RiskReportPageModule {}
