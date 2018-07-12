import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PopoverComponent } from '../components/popover/popover';

// solo functions
import 'rxjs/add/operator/map'

// pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Page_2Page } from '../pages/page-2/page-2';
import { Page_3Page } from '../pages/page-3/page-3';
import { AcronymsPage } from '../pages/acronyms/acronyms';
import { DefinitionsPage } from '../pages/definitions/definitions';
import { FaqsPage } from '../pages/faqs/faqs';
import { ReviewPage } from '../pages/review/review';
import { QuestionsPage } from '../pages/questions/questions';

// components
import { HelpmenuComponent } from '../components/helpmenu/helpmenu';
import { ContactsDropdownComponent } from '../components/contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from '../components/faq-dropdown/faq-dropdown';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page_2Page,
    Page_3Page,
    QuestionsPage,
    AcronymsPage,
    DefinitionsPage,
    FaqsPage,
    ReviewPage,
    HelpmenuComponent,
    ContactsDropdownComponent,
    FaqDropdownComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page_2Page,
    Page_3Page,
    QuestionsPage,
    AcronymsPage,
    DefinitionsPage,
    FaqsPage,
    ReviewPage,
    HelpmenuComponent,
    ContactsDropdownComponent,
    FaqDropdownComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
