// libs
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// solo functions
import 'rxjs/add/operator/map'

// pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AcronymsPageModule } from '../pages/acronyms/acronyms.module';
import { DefinitionsPageModule } from '../pages/definitions/definitions.module';
import { FaqsPageModule } from '../pages/faqs/faqs.module';
import { ReviewPageModule } from '../pages/review/review.module';
import { QuestionsPageModule } from '../pages/questions/questions.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { NavigatePageModule } from '../pages/navigate/navigate.module';
import { NotapplicablePageModule } from '../pages/notapplicable/notapplicable.module';
import { SkippedquestionsPageModule } from '../pages/skippedquestions/skippedquestions.module';
import { ActionitemsPageModule } from '../pages/actionitems/actionitems.module';
import { CriteriaPageModule } from '../pages/criteria/criteria.module';
import { UserDashboardPageModule } from '../pages/user-dashboard/user-dashboard.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { NewAssessmentPageModule } from '../pages/new-assessment/new-assessment.module';


// components
import { ComponentsModule } from '../components/components.module';


// services
import { AuthService } from "../services/auth.service";
import { UploadService } from "../services/upload";
import { httpInterceptorsProviders } from "../services/interceptors";
import { AssessmentService } from "../services/assessment.service";
import { BackUrl } from  "../services/constants";

@NgModule({
  declarations: [
    MyApp,
    HomePage

  ],
  imports: [
    BrowserModule,
		IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
		HttpClientModule,
		HttpLinkModule,
		ApolloModule,
		FormsModule,
		AcronymsPageModule,
		QuestionsPageModule,
		DefinitionsPageModule,
		FaqsPageModule,
		ReviewPageModule,
		DashboardPageModule,
		NavigatePageModule,
		NotapplicablePageModule,
		SkippedquestionsPageModule,
		ActionitemsPageModule,
		CriteriaPageModule,
		UserDashboardPageModule,
		SettingsPageModule,
		NewAssessmentPageModule,
		ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage

  ],
  providers: [
    StatusBar,
		AuthService,
		AssessmentService,
		UploadService,
		httpInterceptorsProviders,
    SplashScreen,
		GoogleAnalytics
		//    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]

})
export class AppModule {
constructor(apollo: Apollo, httpLink: HttpLink) {
	apollo.create({
	link: httpLink.create({uri: BackUrl}),
	cache: new InMemoryCache()
})
}
}
