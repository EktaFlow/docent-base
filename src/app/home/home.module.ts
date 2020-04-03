import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsPage } from '../questions/questions.page';
import { ThreadsListComponent } from "../threads-list/threads-list.component";
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { AuthService } from "../../app/auth.service";
import { AssessmentService } from "../../app/assessment.service";
import { LoginPage } from '../../app/login/login.page';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthService,
    AssessmentService,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    QuestionsPage,
    
  ]
})
export class HomePageModule {}
