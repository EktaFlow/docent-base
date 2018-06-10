import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

// import 'rxjs/add/operator/map'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AcronymsPage } from '../pages/acronyms/acronyms';
import { DefinitionsPage } from '../pages/definitions/definitions';
import { HelpmenuComponent } from '../components/helpmenu/helpmenu';

@NgModule({
  declarations: [
    MyApp,
	HomePage,
	AcronymsPage,
	DefinitionsPage,
	HelpmenuComponent
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
	HelpmenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
