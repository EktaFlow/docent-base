import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

// import 'rxjs/add/operator/map'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Page_2Page } from '../pages/page-2/page-2';
import { AcronymsPage } from '../pages/acronyms/acronyms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page_2Page,
  	AcronymsPage
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp),
	HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page_2Page,
		AcronymsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
