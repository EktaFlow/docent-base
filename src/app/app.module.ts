import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// solo functions
import 'rxjs/add/operator/map'

// pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReviewPage } from '../pages/review/review';
import { QuestionsPage } from '../pages/questions/questions';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { NavigatePage } from '../pages/navigate/navigate';
import { NotapplicablePage } from '../pages/notapplicable/notapplicable';
import { SkippedquestionsPage } from '../pages/skippedquestions/skippedquestions';
import { ActionitemsPage } from '../pages/actionitems/actionitems';
// components
import { ViewsComponent } from '../components/views/views';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestionsPage,
    ReviewPage,
    DashboardPage,
    NavigatePage,
    NotapplicablePage,
    SkippedquestionsPage,
    ActionitemsPage,
    ViewsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuestionsPage,
    ReviewPage,
    DashboardPage,
    NavigatePage,
    NotapplicablePage,
    SkippedquestionsPage,
    ActionitemsPage,
    ViewsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
