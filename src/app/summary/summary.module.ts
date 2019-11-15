import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TopbarComponent } from "../../app/topbar/topbar.component";
import { LegendPopoverComponent } from '../../app/legend-popover/legend-popover.component';
import { QuestionsPage } from "../../app/questions/questions.page";
import { ReportInfoCardComponent } from "../../app/report-info-card/report-info-card.component";

import { IonicModule } from '@ionic/angular';

import { SummaryPage } from './summary.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsPage,
    LegendPopoverComponent,
    ReportInfoCardComponent,
    TopbarComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [SummaryPage]
})
export class SummaryPageModule {}
