import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from '../../app/views/views.component';
import { TopbarComponent } from "../../app/topbar/topbar.component";
import { AssessmentService } from '../../app/assessment.service';
import { ActionItemsPage } from '../../app/action-items/action-items.page';
import { LegendPopoverComponent } from '../../app/legend-popover/legend-popover.component';
import { QuestionsPage } from '../../app/questions/questions.page';
import { ReportInfoCardComponent } from "../../app/report-info-card/report-info-card.component";

import { IonicModule } from '@ionic/angular';

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
    ViewsComponent,
    TopbarComponent,
    AssessmentService,
    ActionItemsPage,
    LegendPopoverComponent,
    QuestionsPage,
    ReportInfoCardComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
