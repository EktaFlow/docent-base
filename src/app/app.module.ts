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
import { Page_2Page } from '../pages/page-2/page-2';
import { AcronymsPage } from '../pages/acronyms/acronyms';
import { DefinitionsPage } from '../pages/definitions/definitions';
import { FaqsPage } from '../pages/faqs/faqs';

// components
import { HelpmenuComponent } from '../components/helpmenu/helpmenu';
import { ContactsDropdownComponent } from '../components/contacts-dropdown/contacts-dropdown';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        Page_2Page,
        AcronymsPage,
        DefinitionsPage,
        FaqsPage,
        HelpmenuComponent,
        ContactsDropdownComponent
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
        Page_2Page,
        AcronymsPage,
        DefinitionsPage,
        FaqsPage,
        HelpmenuComponent,
        ContactsDropdownComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
