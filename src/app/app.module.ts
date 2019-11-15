import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from '../app/app.component';
import { HomePage } from '../app/home/home.page';
import { AcronymsPage } from '../app/acronyms/acronyms.page';
import { DefinitionsPage } from '../app/definitions/definitions.page';
import { FaqsPage } from '../app/faqs/faqs.page';
import { ReviewPage } from '../app/review/review.page';
import { QuestionsPage } from '../app/questions/questions.page';
import { LoginPage } from '../app/login/login.page';
import { DashboardPage } from '../app/dashboard/dashboard.page';
import { NavigatePage } from '../app/navigate/navigate.page';
import { ActionitemsPage } from '../app/actionitems/actionitems.page';
import { CriteriaPage } from '../app/criteria/criteria.page';
import { UserDashboardPage } from '../app/user-dashboard/user-dashboard.page';
import { SettingsPage } from '../app/settings/settings.page';
import { NewAssessmentPage } from '../app/new-assessment/new-assessment.page';
// import { ResetPage } from '../app/reset/reset.page';
import { EditAssessmentPage } from '../app/edit-assessment/edit-assessment.page';
import { SummaryPage } from '../app/summary/summary.page';
import {RiskReportPage} from '../app/risk-report/risk-report.page';
import { AppRouting } from '../app/app-routing.module';

import {AcronymnPopoverComponent} from '../app/acronymn-popover/acronym-popover.component';
import {AddTeamMembersPopoverComponent} from '../app/add-team-members-popover/add-team-members-popover.component';
import {AssessmentScopePopoverComponent} from '../app/asssessment-scope-popover/assessment-scope-popover.component';
import {ContactsDropdownComponent} from '../app/contacts-dropdown/contacts-dropdown.component';
import {DoResetComponent} from '../app/do-reset/do-reset.component';
import {FaqDropdownComponent} from '../app/faq-dropdown/faq-dropdown.component';
import {FileDeleteComponent} from '../app/file-delete/file-delete.component';
import {FileUploadPopoverComponent} from '../app/file-upload-popover/file-upload-popover.component';
import {HelpMenuComponent} from '../app/help-menu/help-menu.component';
import {ImportComponent} from '../app/import/import.component';
import {JsonUploadPopoverComponent} from '../app/json-upload-popover/json-upload-popover.component';
import {LegendPopoverComponent} from '../app/legend-popover/legend-popover.component';
import {MobileNavPopoverComponent} from '../app/mobile-nav-popover/mobile-nav-popover.component';
import {PasswordResetComponent} from '../app/password-reset/password-reset.component';
import {QuestionHistoryPopoverComponent} from '../app/question-history-popover/question-history-popover.component';
import {RegisterComponent} from '../app/register/register.component';
import {ReportInfoCardComponent} from '../app/report-info-card/report-info-card.component';
import {RiskPopoverComponent} from '../app/risk-popover/risk-popover.component';
import {SubthreadPopupComponent} from '../app/subthread-popup/subthread-popup.component';
import {ThreadPopupComponent} from '../app/thread-popup/thread-popup.component';
import {ThreadsListComponent} from '../app/threads-list/threads-list.component';
import {TopbarComponent} from '../app/topbar/topbar.component';
import {ViewsComponent} from '../app/views/views.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowserModule,
		IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot(),
		HttpClientModule,
		HttpLinkModule,
		ApolloModule,
		FormsModule,
		AcronymsPage,
		QuestionsPage,
    LoginPage,
		DefinitionsPage,
		FaqsPage,
		ReviewPage,
		SummaryPage,
		DashboardPage,
		NavigatePage,
		NotapplicablePage,
		ActionitemsPage,
		CriteriaPage,
		UserDashboardPage,
		SettingsPage,
		NewAssessmentPage,
    EditAssessmentPage,
		RiskReportPage,
		ViewsComponent,
    AssessmentslistComponent,
    ThreadsListComponent,
		HelpmenuComponent,
		ContactsDropdownComponent,
		FaqDropdownComponent,
    FileUploadPopoverComponent,
    TopbarComponent,
    ImportComponent,
    SubthreadPopupComponent,
    ThreadPopupComponent,
    RegisterComponent,
    PasswordResetComponent,
    AddTeamMembersPopOverComponent,
    JsonUploadPopoverComponent,
    AssessmentScopePopoverComponent,
    MobileNavPopoverComponent,
    LegendPopoverComponent,
    AcronymPopoverComponent,
    QuestionHistoryPopoverComponent,
    RiskPopoverComponent,
    FileDeleteComponent,
    DoResetComponent,
    ReportInfoCardComponent,
		RouterModule
		// ComponentsModule
  ],
  entryComponents: [
		AppComponent,
	],
  imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		HttpClientModule,
		HttpLinkModule,
		ApolloModule,
		FormsModule,
		AcronymsPage,
		QuestionsPage,
		LoginPage,
		DefinitionsPage,
		FaqsPage,
		ReviewPage,
		SummaryPage,
		DashboardPage,
		NavigatePage,
		NotapplicablePage,
		ActionitemsPage,
		CriteriaPage,
		UserDashboardPage,
		SettingsPage,
		NewAssessmentPage,
		EditAssessmentPage,
		RiskReportPage,
		ViewsComponent,
		AssessmentslistComponent,
		ThreadsListComponent,
		HelpmenuComponent,
		ContactsDropdownComponent,
		FaqDropdownComponent,
		FileUploadPopoverComponent,
		TopbarComponent,
		ImportComponent,
		SubthreadPopupComponent,
		ThreadPopupComponent,
		RegisterComponent,
		PasswordResetComponent,
		AddTeamMembersPopOverComponent,
		JsonUploadPopoverComponent,
		AssessmentScopePopoverComponent,
		MobileNavPopoverComponent,
		LegendPopoverComponent,
		AcronymPopoverComponent,
		QuestionHistoryPopoverComponent,
		RiskPopoverComponent,
		FileDeleteComponent,
		DoResetComponent,
		ReportInfoCardComponent,
		BrowserModule,
		RouterModule
	],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
