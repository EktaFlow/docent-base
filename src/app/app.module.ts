import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// import { TestComponent } from './components/components/test/test.component';

// import LogRocket from 'logrocket';
// LogRocket.init('wdcszb/mfg-docent');

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";



// solo functions
import 'rxjs/add/operator/map'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AssessmentService } from './services/assessment.service';
import { UploadService } from './services/upload';

import { AppComponent } from '../app/app.component';

import { HomePageModule } from './pages/home/home.module';
import { AcronymsPageModule } from './pages/acronyms/acronyms.module';
import { DefinitionsPageModule } from './pages/definitions/definitions.module';
import { FaqsPageModule } from './pages/faqs/faqs.module';
import { ReviewPageModule } from './pages/review/review.module';
import { QuestionsPageModule } from './pages/questions/questions.module';
import { LoginPageModule } from './pages/login/login.module';
import { DashboardPageModule } from './pages/dashboard/dashboard.module';
import { NavigatePageModule } from './pages/navigate/navigate.module';
import { ActionItemsPageModule } from './pages/action-items/action-items.module';
import { CriteriaPageModule } from './pages/criteria/criteria.module';
import { UserDashboardPageModule } from './pages/user-dashboard/user-dashboard.module';
import { SettingsPageModule } from './pages/settings/settings.module';
import { EditAssessmentPageModule } from './pages/edit-assessment/edit-assessment.module';
import { SummaryPageModule } from './pages/summary/summary.module';
import { RiskReportPageModule } from './pages/risk-report/risk-report.module';

import { ComponentsModule } from './components/components.module';
import { Helpers } from './services/helpers/helpers';

import { AppRoutingModule } from '../app/app-routing.module';
import { BackUrl } from  "./services/constants";
import {DocentElectronService} from "./services/docent-electron.service";
import { ElectronService } from 'ngx-electron';



@NgModule({
  declarations: [
    AppComponent,
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
		BrowserModule,
    CommonModule,
    NgxDatatableModule,
		RouterModule,
    ComponentsModule,
    AcronymsPageModule,
		QuestionsPageModule,
    LoginPageModule,
		DefinitionsPageModule,
		FaqsPageModule,
		ReviewPageModule,
		SummaryPageModule,
		DashboardPageModule,
		NavigatePageModule,
		ActionItemsPageModule,
		CriteriaPageModule,
		UserDashboardPageModule,
		SettingsPageModule,
    EditAssessmentPageModule,
		RiskReportPageModule,

	],
  providers: [
    StatusBar,
    SplashScreen,
		AssessmentService,
    Helpers,
    UploadService,
    ElectronService,
    DocentElectronService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
  	apollo.create({
    	link: httpLink.create({uri: BackUrl}),
    	cache: new InMemoryCache()
    })
  }
}
