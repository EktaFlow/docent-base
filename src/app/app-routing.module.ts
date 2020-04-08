import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('src/app/pages/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)},
  { path: 'acronyms', loadChildren: 'src/app/pages/acronyms/acronyms.module#AcronymsPageModule' },
  { path: 'action-items', loadChildren: 'src/app/pages/action-items/action-items.module#ActionItemsPageModule' },
  { path: 'criteria', loadChildren: 'src/app/pages/criteria/criteria.module#CriteriaPageModule' },
  { path: 'dashboard', loadChildren: 'src/app/pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'definitions', loadChildren: 'src/app/pages/definitions/definitions.module#DefinitionsPageModule' },
  { path: 'edit-assessment', loadChildren: 'src/app/pages/edit-assessment/edit-assessment.module#EditAssessmentPageModule' },
  { path: 'faqs', loadChildren: 'src/app/pages/faqs/faqs.module#FaqsPageModule' },
  { path: 'startNew', loadChildren: 'src/app/pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: 'src/app/pages/login/login.module#LoginPageModule' },
  { path: 'navigate', loadChildren: 'src/app/pages/navigate/navigate.module#NavigatePageModule' },
	{ path: 'questions', loadChildren: () => import('src/app/pages/questions/questions.module').then( m => m.QuestionsPageModule) },
  { path: 'reset-password', loadChildren: 'src/app/pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'review', loadChildren: 'src/app/pages/review/review.module#ReviewPageModule' },
  { path: 'risk-report', loadChildren: 'src/app/pages/risk-report/risk-report.module#RiskReportPageModule' },
  { path: 'settings', loadChildren: 'src/app/pages/settings/settings.module#SettingsPageModule' },
  { path: 'summary', loadChildren: 'src/app/pages/summary/summary.module#SummaryPageModule' },
  { path: 'user-dashboard', loadChildren: 'src/app/pages/user-dashboard/user-dashboard.module#UserDashboardPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
