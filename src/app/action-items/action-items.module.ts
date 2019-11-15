import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TopbarComponent } from '../../app/topbar/topbar.component';
import { AssessmentService } from '../../app/assessment.service';
import { ReportInfoCardComponent } from "../../app/report-info-card/report-info-card.component";
import { QuestionsPage } from '../../app/questions/questions.page';

import { IonicModule } from '@ionic/angular';

import { ActionItemsPage } from './action-items.page';

const routes: Routes = [
  {
    path: '',
    component: ActionItemsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsPage,
    TopbarComponent,
    AssessmentService,
    ReportInfoCardComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [ActionItemsPage]
})
export class ActionItemsPageModule {}
