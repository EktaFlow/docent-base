// libs
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// Apollo
import { HttpClientModule } from "@angular/common/http";
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

import { AuthService } from "../services/auth.service";
import { httpInterceptorsProviders } from "../services/interceptors";


// components
import { HelpmenuComponent } from '../components/helpmenu/helpmenu';
import { ContactsDropdownComponent } from '../components/contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from '../components/faq-dropdown/faq-dropdown';
import { AssessmentslistComponent } from "../components/assessmentslist/assessmentslist";
import { ThreadsListComponent } from "../components/threads-list/threads-list";
import { PopoverComponent } from '../components/popover/popover';
<<<<<<< HEAD

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
		ThreadsListComponent 
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
		ThreadsListComponent 
  ],
  providers: [
    StatusBar,
		AuthService,
		httpInterceptorsProviders,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
constructor(apollo: Apollo, httpLink: HttpLink) {
	apollo.create({
	link: httpLink.create({uri: "http://localhost:4000"}),
	cache: new InMemoryCache()
})
}
}
