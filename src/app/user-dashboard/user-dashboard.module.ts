import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from "../../app/auth.service";
import { AssessmentService } from "../../app/assessment.service";
import { TopbarComponent } from "../../app/topbar/topbar.component";
import { FileDeleteComponent } from '../../app/file-delete/file-delete.component';
import { SettingsPage } from "../../app/settings/settings.page";
import { QuestionsPage } from "../../app/questions/questions.page";
import { DashboardPage } from "../../app/dashboard/dashboard.page";
import { ActionItemsPage } from "../../app/action-items/action-items.page";
import { EditAssessmentPage } from '../../app/edit-assessment/edit-assessment.page';
import { AddTeamMembersPopOverComponent } from "../../app/add-team-members-pop-over/add-team-members-pop-over.component";
import { HomePage } from "../../app/home/home.page";
import { ImportComponent } from "../../app/import/import.component";

import { IonicModule } from '@ionic/angular';

import { UserDashboardPage } from './user-dashboard.page';

const routes: Routes = [
  { path: '', component: UserDashboardPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthService,
    AssessmentService,
		//TopbarComponent,
    FileDeleteComponent,
    SettingsPage,
    QuestionsPage,
    DashboardPage,
    ActionItemsPage,
    EditAssessmentPage,
    AddTeamMembersPopOverComponent,
    HomePage,
    ImportComponent,
    RouterModule.forChild(routes)
  ],
	declarations: [UserDashboardPage, TopbarComponent],
})
export class UserDashboardPageModule {}
