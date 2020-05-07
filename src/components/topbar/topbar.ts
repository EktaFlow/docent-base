import { Component, OnInit, Input, NgModule } from '@angular/core';
import { PopoverController, NavController, IonicModule } from "@ionic/angular";
import { ViewsComponent } from "../../components/views/views.component";
import { HomePage } from "../../pages/home/home.page";
import { LoginPage } from '../../pages/login/login.page';
import { NavigatePage} from "../../pages/navigate/navigate.page";
import { AuthService } from "../../services/auth.service";
import { HelpmenuComponent } from "../../components/helpmenu/helpmenu.component";
import { SubthreadPopupComponent } from "../../components/subthread-popup/subthread-popup.component";
import { UserDashboardPage } from "../../pages/user-dashboard/user-dashboard.page";
import { ThreadPopupComponent} from "../../components/thread-popup/thread-popup.component";
import { AssessmentScopePopoverComponent } from "../../components/assessment-scope-popover/assessment-scope-popover.component";
import { MobileNavPopoverComponent } from '../../components/mobile-nav-popover/mobile-nav-popover.component';
import {QuestionHistoryPopoverComponent} from '../../components/question-history-popover/question-history-popover.component';
import {QuestionsPage} from '../../pages/questions/questions.page';
import { Router } from '@angular/router';

import { AssessmentService } from "../../services/assessment.service";


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String!) {
	assessment(_id: $_id) {
		scope
		targetMRL
		targetDate
	}
}
`

// @NgModule()
@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  //vars
  public userDashPage = UserDashboardPage;
	public scope: any;
	public targetMRL: any;
	public targetDate: any;
	public scopeSelected: any;
	public loggedIn: boolean = false;
	@Input() public assessmentId: any;
	// the question info is only relevant for the questions page. whereas the assessments info is relevant for all the pages.
	@Input() private mainTitle: any;
	@Input() private subTitle: any;
	@Input() private questionLevel: any;
	@Input() private currentQPos: any;
	@Input() private currentQSetAmt: any;
	@Input() public noSecondBar: any;
	// public popUpButtonClicked: any;
	@Input() private blank: boolean;
	@Input() private values: any;
	@Input() private getAssessmentId: any;
	@Input() public pageName: any;
	@Input() private questionId: any;
	public popUpButtonClicked: any;

	constructor(
		public popOver: PopoverController,
		public auth:    AuthService,
		public navCtrl: NavController,
		private apollo: Apollo,
		private assessmentService: AssessmentService,
		public router: Router
	) { }

		async ngOnInit() {

			if (this.getAssessmentId) {
				this.assessmentId = await this.assessmentService.getCurrentAssessmentId();
				this.getAssessmentData();

			} else {
				this.assessmentId ? this.getAssessmentData() : null;
			}

			this.loggedIn = this.auth.isLoggedIn();



		}

		toggleScopeSelected(event) {

			this.popOver.create({
				component: AssessmentScopePopoverComponent,
				componentProps: {
						scopeText: this.scope,
				},
				cssClass: 'scope-popover',
				event: event
			})
			.then(popover => popover.present());
		}

		toggleInfo(event) {
			this.popOver.create({
				component: AssessmentScopePopoverComponent,
				componentProps: {
					scopeText: this.scope,
					targetMRL: this.targetMRL,
					targetDate: this.targetDate,
				},
				cssClass: 'scope-popover',
				event: event
			}).then(popover => popover.present());

		}



		getAssessmentData() {
			this.apollo.watchQuery<any>({
				query: assessmentQuery,
				variables: {
					_id: this.assessmentId
				}
			}).valueChanges
				.subscribe( ({data, loading}) => {
					this.scope	= data.assessment.scope;
					this.targetMRL  = data.assessment.targetMRL;
					this.targetDate = data.assessment.targetDate;
				});
		}

	  presentViewsPop(event){
			this.popOver.create({
				component: ViewsComponent,
				componentProps: {
					assessmentId: this.assessmentId,
				},
				event: event
			}).then(popover => popover.present());
	  }

		showHelp(event) {
			this.popOver.create({
				component: HelpmenuComponent,
				componentProps: {
					assessmentId: this.assessmentId,
				},
				event: event
			}).then(popover => popover.present());

		}
		handleContinue(){
			this.router.navigate(["/questions", {assessmentId: this.assessmentId}]);
			// this.navCtrl.push(QuestionsPage, { assessmentId: this.assessmentId});
		}

		// registerNav() { this.navCtrl.push( this.registerPage ); }
		// loginNav() { this.navCtrl.push( this.loginPage ); }
		handleLogout() {
			//TO DO
			//handle this situtation - need to set route correctly in app-routing.module
			this.auth.logout();
			// this.navCtrl.setRoot(LoginPage);
			// this.navCtrl.popToRoot();
			this.router.navigate(["/home"]);
		}

		async goToNavExpand(){
			var updateInfo = {
				updates: this.values,
				_id:     this.assessmentId,
				questionId: this.questionId
			}

	    /*
			var update = await this.assessmentService.updateQuestion(updateInfo);
			update.subscribe(data => );
	    */
			this.router.navigate(["/navigate", {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true}]);

	    // this.navCtrl.push(NavigatePage, {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true});
		}


		async handleUserDash() {
			if (this.assessmentId ) {
	    /* Removing this feature -- we now have the save button -ask if we want to keep it?
				var updateInfo = {
					updates: this.values,
					_id:     this.assessmentId,
					questionId: this.questionId
				}

				var update = await this.assessmentService.updateQuestion(updateInfo);
				update.subscribe(data => this.navCtrl.push(this.userDashPage, {assessmentId: this.assessmentId}));
	      */
				this.router.navigate(["/user-dashboard", {assessmentId: this.assessmentId}]);
	      // this.navCtrl.push(this.userDashPage, {assessmentId: this.assessmentId})
			} else {
				this.router.navigate(["/user-dashboard"]);

				// this.navCtrl.push(this.userDashPage);
			}
	 	}

		// async updateQuestion() {
		// 	var updateInfo = {
		// 		updates: this.values,
		// 		_id:     this.assessmentId,
		// 		questionId: this.questionId
		// 	}
		// 	var update = await this.assessmentService.updateQuestion(updateInfo);
		// 	update.subscribe(data => null);
		// }



		presentSubThreadPop(event, mobileness){
			var updateInfo = {
				updates: this.values,
				_id:     this.assessmentId,
				questionId: this.questionId
			}
			let stpopover = this.popOver.create({
				component: SubthreadPopupComponent,
				componentProps: {
					assessmentId: this.assessmentId,
					subTitle: this.subTitle,
					updateInfo: updateInfo,
				},
				event: event,
				cssClass: 'sub-thread-popup'
			});
				if (mobileness == "false"){
					stpopover.then(popover => popover.present());
				} else {
					stpopover.then(popover => popover.present());
				}
	  }

		presentThreadPop(event, mobileness){
			var updateInfo = {
				updates: this.values,
				_id:     this.assessmentId,
				questionId: this.questionId
			}
			var tpopover = this.popOver.create({
				component: ThreadPopupComponent,
				componentProps: {
					assessmentId: this.assessmentId,
					updateInfo: updateInfo,
				},
				event: event,
				cssClass: 'thread-popup'
			});
			if (mobileness == "false"){
				tpopover.then(popover => popover.present());
			} else {
				tpopover.then(popover => popover.present());
			}
		}

		toggleQuestionHistory(){
			this.popOver.create({
				component: QuestionHistoryPopoverComponent,
				componentProps: {
					assessmentId: this.assessmentId,
					questionId: this.questionId,
				},
				cssClass: 'question-history-popup'
			}).then(popover => popover.present());
		}

		openMobileNav(){
			console.log(this.noSecondBar);
			var userName = this.auth.currentUser().name;
			this.popOver.create({
				component: MobileNavPopoverComponent,
				componentProps: {
					assessmentId: this.assessmentId,
					userName: userName,
					noSecondBar: this.noSecondBar,
				},
				cssClass: 'mobile-nav-pop'
			}).then(popover => popover.present());
		}

		// toggleTopbarInfo(){
		// 	this.infoShow = !this.infoShow;
		// }

}
