// libs
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

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


// components
import { HelpmenuComponent } from '../components/helpmenu/helpmenu';
import { ContactsDropdownComponent } from '../components/contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from '../components/faq-dropdown/faq-dropdown';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AcronymsPage,
        QuestionsPage,
        ReviewPage,
        DefinitionsPage,
        FaqsPage,
				RegisterPage,
				LoginPage,
        HelpmenuComponent,
        ContactsDropdownComponent,
        FaqDropdownComponent 
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AcronymsPage,
        DefinitionsPage,
        FaqsPage,
        QuestionsPage, 
        ReviewPage, 
				RegisterPage,
				LoginPage,
        HelpmenuComponent,
        ContactsDropdownComponent,
        FaqDropdownComponent 
    ],
    providers: [
        StatusBar,
				AuthService,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
