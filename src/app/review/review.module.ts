import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TopbarComponent } from '../../app/topbar/topbar.component';
import { QuestionsPage } from "../../app/questions/questions.page";
import { ReportInfoCardComponent } from "../../app/report-info-card/report-info-card.component";

import { IonicModule } from '@ionic/angular';

import { ReviewPage } from './review.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopbarComponent,
    QuestionsPage,
    ReportInfoCardComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewPage]
})
export class ReviewPageModule {}
