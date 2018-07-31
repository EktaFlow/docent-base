import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular'

import { HomePage } from '../../pages/home/home';
import { ReviewPage } from '../../pages/review/review';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { NavigatePage } from '../../pages/navigate/navigate';
import { NotapplicablePage } from '../../pages/notapplicable/notapplicable';
import { SkippedquestionsPage } from '../../pages/skippedquestions/skippedquestions';
import { ActionitemsPage } from '../../pages/actionitems/actionitems';

@Component({
  selector: 'views',
  templateUrl: 'views.html'
})
export class ViewsComponent {

  homePage = HomePage;
  reviewPage = ReviewPage;
  dashboardPage = DashboardPage;
  navigatePage = NavigatePage;
  actionitemsPage = ActionitemsPage;
	assessmentId: any;
  
  constructor( public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
		this.assessmentId = navParams.data.assessmentId;
  }

		handleSkipped() {
			this.navCtrl.push(SkippedquestionsPage, {assessmentId: this.assessmentId})
		}

		handleNa() {
			this.navCtrl.push(NotapplicablePage, {assessmentId: this.assessmentId});
		}

		handleActions = () => this.navCtrl.push(ActionitemsPage, {assessmentId: this.assessmentId});
		handleReview = () => this.navCtrl.push(ReviewPage, {assessmentId: this.assessmentId});
		handleNavigate = () => this.navCtrl.push(NavigatePage, {assessmentId: this.assessmentId});

    close() {
    this.viewCtrl.dismiss();
    }

}

