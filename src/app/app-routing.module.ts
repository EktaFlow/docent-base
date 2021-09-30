import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/can-activate"

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("src/app/pages/user-dashboard/user-dashboard.module").then(
        (m) => m.UserDashboardPageModule
      ),
    canActivate: [AuthGuardService]
  },
  {
    path: "acronyms",
    loadChildren: "src/app/pages/acronyms/acronyms.module#AcronymsPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "action-items",
    loadChildren:
      "src/app/pages/action-items/action-items.module#ActionItemsPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "criteria",
    loadChildren: "src/app/pages/criteria/criteria.module#CriteriaPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "dashboard",
    loadChildren:
      "src/app/pages/dashboard/dashboard.module#DashboardPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "definitions",
    loadChildren:
      "src/app/pages/definitions/definitions.module#DefinitionsPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "edit-assessment",
    loadChildren:
      "src/app/pages/edit-assessment/edit-assessment.module#EditAssessmentPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "faqs",
    loadChildren: "src/app/pages/faqs/faqs.module#FaqsPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "startNew",
    loadChildren: "src/app/pages/home/home.module#HomePageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    loadChildren: "src/app/pages/login/login.module#LoginPageModule",
  },
  {
    path: "navigate",
    loadChildren: "src/app/pages/navigate/navigate.module#NavigatePageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "questions",
    loadChildren: () =>
      import("src/app/pages/questions/questions.module").then(
        (m) => m.QuestionsPageModule
      ),
    canActivate: [AuthGuardService]
  },
  { path: "questions/:folder",
    loadChildren: () => import("src/app/pages/questions/questions.module").then(
      (m) => m.QuestionsPageModule
    ),
    canActivate: [AuthGuardService]


  },
  {
    path: "reset-password",
    loadChildren:
      "src/app/pages/reset-password/reset-password.module#ResetPasswordPageModule",
  },
  {
    path: "review",
    loadChildren: "src/app/pages/review/review.module#ReviewPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "comprehensive",
    loadChildren: "src/app/pages/comprehensive/comprehensive.module#ComprehensivePageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "risk-report",
    loadChildren:
      "src/app/pages/risk-report/risk-report.module#RiskReportPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "settings",
    loadChildren: "src/app/pages/settings/settings.module#SettingsPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "summary",
    loadChildren: "src/app/pages/summary/summary.module#SummaryPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "user-dashboard",
    loadChildren:
      "src/app/pages/user-dashboard/user-dashboard.module#UserDashboardPageModule",
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
