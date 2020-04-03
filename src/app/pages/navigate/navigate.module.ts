import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReportInfoCardComponent } from "../report-info-card/report-info-card.component";
import { TopbarComponent } from "../topbar/topbar.component";
import { QuestionsPage } from '../questions/questions.page';

import { IonicModule } from '@ionic/angular';

import { NavigatePage } from './navigate.page';

const routes: Routes = [
  {
    path: '',
    component: NavigatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportInfoCardComponent,
    TopbarComponent,
    QuestionsPage,
    RouterModule.forChild(routes)
  ],
  declarations: [NavigatePage]
})
export class NavigatePageModule {}
