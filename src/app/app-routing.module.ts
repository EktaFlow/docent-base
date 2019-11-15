import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)},
  { path: 'acronyms', loadChildren: './acronyms/acronyms.module#AcronymsPageModule' },
  { path: 'action-items', loadChildren: './action-items/action-items.module#ActionItemsPageModule' },
  { path: 'criteria', loadChildren: './criteria/criteria.module#CriteriaPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'definitions', loadChildren: './definitions/definitions.module#DefinitionsPageModule' },
  { path: 'edit-assessment', loadChildren: './edit-assessment/edit-assessment.module#EditAssessmentPageModule' },
  { path: 'faqs', loadChildren: './faqs/faqs.module#FaqsPageModule' },
  { path: 'startNew', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'navigate', loadChildren: './navigate/navigate.module#NavigatePageModule' },
  { path: 'new-assessment', loadChildren: './new-assessment/new-assessment.module#NewAssessmentPageModule' },
  { path: 'questions', loadChildren: './questions/questions.module#QuestionsPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'review', loadChildren: './review/review.module#ReviewPageModule' },
  { path: 'risk-report', loadChildren: './risk-report/risk-report.module#RiskReportPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'summary', loadChildren: './summary/summary.module#SummaryPageModule' },
  { path: 'user-dashboard', loadChildren: './user-dashboard/user-dashboard.module#UserDashboardPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
