import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReviewPage } from '../../app/review/review.page';
import { ViewsComponent } from '../../app/views/views.component';
import { AssessmentService } from "../../app/assessment.service";
import { AuthService } from "../../app/auth.service";
import {FileUploadPopoverComponent} from "../../app/file-upload-popover/file-upload-popover.component";
import { FileDeleteComponent } from '../../app/file-delete/file-delete.component';
import { RiskPopoverComponent } from '../../app/risk-popover/risk-popover.component';
import { TopbarComponent } from "../../app/topbar/topbar.component";

import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewsComponent,
    FileDeleteComponent,
    RiskPopoverComponent,
    AssessmentService,
    AuthService,
    ReviewPage,
    FileUploadPopoverComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [QuestionsPage, TopbarComponent]
})
export class QuestionsPageModule {}
