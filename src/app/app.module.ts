// libs
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// solo functions
import 'rxjs/add/operator/map'

// pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AcronymsPage } from '../pages/acronyms/acronyms';
import { DefinitionsPage } from '../pages/definitions/definitions';
import { FaqsPage } from '../pages/faqs/faqs';
import { ReviewPage } from '../pages/review/review';
import { QuestionsPage } from '../pages/questions/questions';
import { RegisterPage } from "../pages/register/register";
import { LoginPage }    from "../pages/login/login";
import { DashboardPage } from '../pages/dashboard/dashboard';
import { NavigatePage } from '../pages/navigate/navigate';
import { NotapplicablePage } from '../pages/notapplicable/notapplicable';
import { SkippedquestionsPage } from '../pages/skippedquestions/skippedquestions';
import { ActionitemsPage } from '../pages/actionitems/actionitems';
import { CriteriaPage } from '../pages/criteria/criteria';
import { UserDashboardPage } from '../pages/user-dashboard/user-dashboard';
import { SettingsPage } from '../pages/settings/settings';

// components
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
import { LoginComponent } from "../components/login/login";
import { RegisterComponent } from "../components/register/register";

// services
import { AuthService } from "../services/auth.service";
import { UploadService } from "../services/upload";
import { httpInterceptorsProviders } from "../services/interceptors";

import { BackUrl } from  "../services/constants";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestionsPage,
    AcronymsPage,
    DefinitionsPage,
    FaqsPage,
		AcronymsPage,
    ReviewPage,
		RegisterPage,
		LoginPage,
    HelpmenuComponent,
    ContactsDropdownComponent,
		FaqDropdownComponent,
		AssessmentslistComponent,
		ThreadsListComponent,
		FileUploadPopoverComponent,
    ReviewPage,
    DashboardPage,
    NavigatePage,
    NotapplicablePage,
    SkippedquestionsPage,
    ActionitemsPage,
    CriteriaPage,
    UserDashboardPage,
    SettingsPage,
		ViewsComponent,
		ImportComponent,
		TopbarComponent,
    SubthreadPopupComponent
		LoginComponent,
		RegisterComponent
  ],
  imports: [
    BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpClientModule,
		HttpLinkModule,
		ApolloModule,
		FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuestionsPage,
    AcronymsPage,
    DefinitionsPage,
    FaqsPage,
		AcronymsPage,
    ReviewPage,
		RegisterPage,
		LoginPage,
    HelpmenuComponent,
    ContactsDropdownComponent,
		FaqDropdownComponent,
		AssessmentslistComponent,
		ThreadsListComponent,
		FileUploadPopoverComponent,
    DashboardPage,
    NavigatePage,
    NotapplicablePage,
    SkippedquestionsPage,
    CriteriaPage,
    ActionitemsPage,
    UserDashboardPage,
    SettingsPage,
    ViewsComponent,
		ImportComponent,
		TopbarComponent,
    SubthreadPopupComponent
		LoginComponent,
		RegisterComponent
  ],
  providers: [
    StatusBar,
		AuthService,
		UploadService,
		httpInterceptorsProviders,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
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
