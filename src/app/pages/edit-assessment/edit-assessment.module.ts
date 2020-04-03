import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardPage } from '../../app/user-dashboard/user-dashboard.page';
import { AuthService } from "../../app/auth.service";
import { FileDeleteComponent } from '../../app/file-delete/file-delete.component';
import { Helpers } from '../helpers/helpers';

import { IonicModule } from '@ionic/angular';

import { EditAssessmentPage } from './edit-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: EditAssessmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDashboardPage,
    AuthService,
    FileDeleteComponent,
    RouterModule.forChild(routes)
  ],
	declarations: [EditAssessmentPage],
	providers: [Helpers]
})
export class EditAssessmentPageModule {}
