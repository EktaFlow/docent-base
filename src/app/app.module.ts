import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { HomePage } from './home/home';
import { AcronymsPageModule } from './acronyms/acronyms.module';
import { DefinitionsPageModule } from './definitions/definitions.module';
import { FaqsPageModule } from './faqs/faqs.module';
import { ReviewPageModule } from './review/review.module';
import { QuestionsPageModule } from './questions/questions.module';
import { LoginPageModule } from './login/login.module';
import { DashboardPageModule } from './dashboard/dashboard.module';
import { NavigatePageModule } from './navigate/navigate.module';
import { NotapplicablePageModule } from './notapplicable/notapplicable.module';
import { ActionitemsPageModule } from './actionitems/actionitems.module';
import { CriteriaPageModule } from './criteria/criteria.module';
import { UserDashboardPageModule } from './user-dashboard/user-dashboard.module';
import { SettingsPageModule } from './settings/settings.module';
import { NewAssessmentPageModule } from './new-assessment/new-assessment.module';
// import { ResetPageModule } from './reset/reset.module';
import { EditAssessmentPageModule } from './edit-assessment/edit-assessment.module';
import { SummaryPageModule } from './summary/summary.module';
import {RiskReportPageModule} from './risk-report/risk-report.module';
import { AppRoutingModule } from './app-routing.module';

import {AcronymnPopoverComponent} from './acronymn-popover/acronym-popover';
import {AddTeamMembersPopoverComponent} from './add-team-members-popover/add-team-members-popover';
import {AssessmentScopePopoverComponent} from './asssessment-scope-popover/assessment-scope-popover';
import {ContactsDropdownComponent} from './contacts-dropdown/contacts-dropdown';
import {DoResetComponent} from './do-reset/do-reset';
import {FaqDropdownComponent} from './faq-dropdown/faq-dropdown';
import {FileDeleteComponent} from './file-delete/file-delete';
import {FileUploadPopoverComponent} from './file-upload-popover/file-upload-popover';
import {HelpMenuComponent} from './help-menu/help-menu';
import {ImportComponent} from './import/import';
import {JsonUploadPopoverComponent} from './json-upload-popover/json-upload-popover';
import {LegendPopoverComponent} from './legend-popover/legend-popover';
import {MobileNavPopoverComponent} from './mobile-nav-popover/mobile-nav-popover';
import {PasswordResetComponent} from './password-reset/password-reset';
import {QuestionHistoryPopoverComponent} from './question-history-popover/question-history-popover';
import {RegisterComponent} from './register/register';
import {ReportInfoCardComponent} from './report-info-card/report-info-card';
import {RiskPopoverComponent} from './risk-popover/risk-popover';
import {SubthreadPopupComponent} from './subthread-popup/subthread-popup';
import {ThreadPopupComponent} from './thread-popup/thread-popup';
import {ThreadsListComponent} from './threads-list/threads-list';
import {TopbarComponent} from './topbar/topbar';
import {ViewsComponent} from './views/views';

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
		AcronymsPageModule,
		QuestionsPageModule,
    LoginPageModule,
		DefinitionsPageModule,
		FaqsPageModule,
		ReviewPageModule,
		SummaryPageModule,
		DashboardPageModule,
		NavigatePageModule,
		NotapplicablePageModule,
		ActionitemsPageModule,
		CriteriaPageModule,
		UserDashboardPageModule,
		SettingsPageModule,
		NewAssessmentPageModule,
    EditAssessmentPageModule,
		RiskReportPageModule,
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
    ReportInfoCardComponent
		// ComponentsModule
  ],
  entryComponents: [
		AppComponent,
		HomePage
	],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
