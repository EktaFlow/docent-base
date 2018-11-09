// libs
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

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
import { RegisterPageModule } from "../pages/register/register.module";
import { LoginPageModule }    from "../pages/login/login.module";
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { NavigatePageModule } from '../pages/navigate/navigate.module';
import { NotapplicablePageModule } from '../pages/notapplicable/notapplicable.module';
import { SkippedquestionsPageModule } from '../pages/skippedquestions/skippedquestions.module';
import { ActionitemsPageModule } from '../pages/actionitems/actionitems.module';
import { CriteriaPageModule } from '../pages/criteria/criteria.module';
import { UserDashboardPageModule } from '../pages/user-dashboard/user-dashboard.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { NewAssessmentPageModule } from '../pages/new-assessment/new-assessment.module';
import { ResetPageModule } from '../pages/reset/reset.module';

// components
import { ComponentsModule } from '../components/components.module';
import { ImportComponent } from "../components/import/import";
import { ViewsComponent } from '../components/views/views';
import { HelpmenuComponent } from '../components/helpmenu/helpmenu';
import { ContactsDropdownComponent } from '../components/contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from '../components/faq-dropdown/faq-dropdown';
import { AssessmentslistComponent } from "../components/assessmentslist/assessmentslist";
import { ThreadsListComponent } from "../components/threads-list/threads-list";
import { FileUploadPopoverComponent } from "../components/file-upload-popover/file-upload-popover";
import { TopbarComponent } from "../components/topbar/topbar";
import { SubthreadPopupComponent } from "../components/subthread-popup/subthread-popup";
import { ThreadPopupComponent} from "../components/thread-popup/thread-popup";
import { LoginComponent } from "../components/login/login";
import { RegisterComponent } from "../components/register/register";
import { PasswordResetComponent } from '../components/password-reset/password-reset';

// services
import { AuthService } from "../services/auth.service";
import { UploadService } from "../services/upload";
import { httpInterceptorsProviders } from "../services/interceptors";
import { AssessmentService } from "../services/assessment.service";
import { BackUrl } from  "../services/constants";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
		//QuestionsPage,
		//AcronymsPage,
		// DefinitionsPage,
		//FaqsPage,
		//AcronymsPage,
		//ReviewPage,
		//RegisterPage,
		//LoginPage,
		//HelpmenuComponent,
		//ContactsDropdownComponent,
		//FaqDropdownComponent,
		//AssessmentslistComponent,
		//ThreadsListComponent,
		//FileUploadPopoverComponent,
		//DashboardPage,
		//NavigatePage,
		//NotapplicablePage,
		//SkippedquestionsPage,
		//ActionitemsPage,
		//CriteriaPage,
		//ViewsComponent,
		//UserDashboardPage,
		//SettingsPage,
		//NewAssessmentPage,
		//ImportComponent,
		// TopbarComponent,
		//SubthreadPopupComponent,
		//ThreadPopupComponent,
		//LoginComponent,
		//RegisterComponent
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
		RegisterPageModule,
		LoginPageModule,
		DashboardPageModule,
		NavigatePageModule,
		NotapplicablePageModule,
		SkippedquestionsPageModule,
		ActionitemsPageModule,
		CriteriaPageModule,
		UserDashboardPageModule,
		SettingsPageModule,
		NewAssessmentPageModule,
                ResetPageModule,
		ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PasswordResetComponent,
		//QuestionsPage,
		//AcronymsPage,
		//DefinitionsPage,
		//FaqsPage,
		//AcronymsPage,
		//ReviewPage,
		//RegisterPage,
		//LoginPage,
		//HelpmenuComponent,
		//ContactsDropdownComponent,
		//FaqDropdownComponent,
		//AssessmentslistComponent,
		//ThreadsListComponent,
		//FileUploadPopoverComponent,
		//DashboardPage,
		//NavigatePage,
		//NotapplicablePage,
		//SkippedquestionsPage,
		//CriteriaPage,
		//ActionitemsPage,
		//UserDashboardPage,
		//SettingsPage,
		//NewAssessmentPage,
		//ViewsComponent,
		//ImportComponent,
		//TopbarComponent,
		//SubthreadPopupComponent,
		//ThreadPopupComponent,
		//LoginComponent,
		//RegisterComponent
  ],
  providers: [
    StatusBar,
		AuthService,
		AssessmentService,
		UploadService,
		httpInterceptorsProviders,
    SplashScreen,
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
