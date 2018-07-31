import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { ReviewPage } from '../../pages/review/review';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { NavigatePage } from '../../pages/navigate/navigate';
import { NotapplicablePage } from '../../pages/notapplicable/notapplicable';
import { SkippedquestionsPage } from '../../pages/skippedquestions/skippedquestions';
import { ActionitemsPage } from '../../pages/actionitems/actionitems';

/**
 * Generated class for the ViewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'views',
  templateUrl: 'views.html'
})
export class ViewsComponent {

  text: string;

  homePage = HomePage;
  reviewPage = ReviewPage;
  dashboardPage = DashboardPage;
  navigatePage = NavigatePage;
  notapplicablePage = NotapplicablePage;
  skippedquestionsPage = SkippedquestionsPage;
  actionitemsPage = ActionitemsPage;
  
  constructor( public navCtrl: NavController, public viewCtrl: ViewController) {
  }

    close() {
    this.viewCtrl.dismiss();
    }

}

