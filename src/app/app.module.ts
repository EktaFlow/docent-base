import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { Keyboard } from '@ionic-native/keyboard';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { TestComponent } from './components/components/test/test.component';
import { ComponentsModule } from './components/components.module';


// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// solo functions
import 'rxjs/add/operator/map'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AssessmentService } from '../app/assessment.service';
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
import { ActionItemsPage } from '../app/action-items/action-items.page';
import { CriteriaPage } from '../app/criteria/criteria.page';
import { UserDashboardPage } from '../app/user-dashboard/user-dashboard.page';
import { SettingsPage } from '../app/settings/settings.page';
import { EditAssessmentPage } from '../app/edit-assessment/edit-assessment.page';
import { SummaryPage } from '../app/summary/summary.page';
import {RiskReportPage} from '../app/risk-report/risk-report.page';
import { AppRoutingModule } from '../app/app-routing.module';

import {AcronymPopoverComponent} from '../app/acronym-popover/acronym-popover.component';
import {AddTeamMembersPopOverComponent} from '../app/add-team-members-pop-over/add-team-members-pop-over.component';
import {AssessmentScopePopoverComponent} from '../app/assessment-scope-popover/assessment-scope-popover.component';
import {ContactsDropdownComponent} from '../app/contacts-dropdown/contacts-dropdown.component';
//import {DoResetComponent} from '../app/do-reset/do-reset.component';
import {FaqDropdownComponent} from '../app/faq-dropdown/faq-dropdown.component';
import {FileDeleteComponent} from '../app/file-delete/file-delete.component';
import {FileUploadPopoverComponent} from '../app/file-upload-popover/file-upload-popover.component';
import {HelpmenuComponent} from '../app/helpmenu/helpmenu.component';
import {ImportComponent} from '../app/import/import.component';
import {JsonUploadPopoverComponent} from '../app/json-upload-popover/json-upload-popover.component';
import {LegendPopoverComponent} from '../app/legend-popover/legend-popover.component';
import {MobileNavPopoverComponent} from '../app/mobile-nav-popover/mobile-nav-popover.component';
//import {PasswordResetComponent} from '../app/password-reset/password-reset.component';
import {QuestionHistoryPopoverComponent} from '../app/question-history-popover/question-history-popover.component';
//import {RegisterComponent} from '../app/register/register.component';
import {ReportInfoCardComponent} from '../app/report-info-card/report-info-card.component';
import {RiskPopoverComponent} from '../app/risk-popover/risk-popover.component';
import {SubthreadPopupComponent} from '../app/subthread-popup/subthread-popup.component';
import {ThreadPopupComponent} from '../app/thread-popup/thread-popup.component';
import {ThreadsListComponent} from '../app/threads-list/threads-list.component';
import {ViewsComponent} from '../app/views/views.component';


@NgModule({
  declarations: [
    AppComponent,
		AcronymsPage,
		//QuestionsPage,
		//LoginPage,
		//DefinitionsPage,
		//FaqsPage,
		//ReviewPage,
		//SummaryPage,
		//DashboardPage,
		//NavigatePage,
		//ActionItemsPage,
		//CriteriaPage,
		//UserDashboardPage,
		//SettingsPage,
		//EditAssessmentPage,
		//RiskReportPage,
		ViewsComponent,
    ThreadsListComponent,
		HelpmenuComponent,
		ContactsDropdownComponent,
		FaqDropdownComponent,
    FileUploadPopoverComponent,
    ImportComponent,
    SubthreadPopupComponent,
    ThreadPopupComponent,
		//    RegisterComponent,
		//PasswordResetComponent,
    AddTeamMembersPopOverComponent,
    JsonUploadPopoverComponent,
    AssessmentScopePopoverComponent,
    MobileNavPopoverComponent,
    LegendPopoverComponent,
    AcronymPopoverComponent,
    QuestionHistoryPopoverComponent,
    RiskPopoverComponent,
    FileDeleteComponent,
		//    DoResetComponent,
    ReportInfoCardComponent,
  ],
  entryComponents: [
		AppComponent,

		//		TestComponent
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
		BrowserModule,
		RouterModule,
    ComponentsModule
	],
  providers: [
    StatusBar,
    SplashScreen,
		AssessmentService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
