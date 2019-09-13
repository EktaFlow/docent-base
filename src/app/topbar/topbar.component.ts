import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, NavController } from "@ionic/angular";
import { ViewsComponent } from "../views/views";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from '../../pages/login/login';
import { NavigatePage} from "../../pages/navigate/navigate";
import { AuthService } from "../../services/auth.service";
import { HelpmenuComponent } from "../helpmenu/helpmenu";
import { SubthreadPopupComponent } from "../subthread-popup/subthread-popup";
import { UserDashboardPage } from "../../pages/user-dashboard/user-dashboard";
import { ThreadPopupComponent} from "../thread-popup/thread-popup";
import { AssessmentScopePopoverComponent } from "../assessment-scope-popover/assessment-scope-popover";
import { MobileNavPopoverComponent } from '../mobile-nav-popover/mobile-nav-popover';
import {QuestionHistoryPopoverComponent} from '../question-history-popover/question-history-popover';
import {QuestionsPage} from '../../pages/questions/questions';
import { RouterModule } from '@angular/router';

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

@Component({
  selector: 'app-topbar',
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
		public router: RouterModule
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
			this.popOver.create(
				AssessmentScopePopoverComponent,
				{scopeText: this.scope},
				{cssClass: 'scope-popover'}
			).then(popover => popover.present({ev: event}););
		}

		toggleInfo(event) {
			this.popOver.create(
				AssessmentScopePopoverComponent,
				{scopeText: this.scope, targetMRL: this.targetMRL, targetDate: this.targetDate},
				{cssClass: 'scope-popover'}
			).then(popover => popover.present({ev: event}););

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
			this.popOver.create(
				ViewsComponent,
				{assessmentId: this.assessmentId}
			).then(popover => popover.present({ev: event}););
	  }

		showHelp(event) {
			this.popOver.create(
				HelpmenuComponent,
				{assessmentId: this.assessmentId}
			).then(popover => popover.present({ev: event}););

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
			this.navCtrl.setRoot(LoginPage);
			this.navCtrl.popToRoot();
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
			let stpopover = this.popOver.create(
				SubthreadPopupComponent,
				{assessmentId: this.assessmentId, subTitle: this.subTitle, updateInfo: updateInfo},
				{cssClass: 'sub-thread-popup'}
			);
				if (mobileness == "false"){
					stpopover.then(popover => popover.present({ev: event}));
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
			var tpopover = this.popOver.create(ThreadPopupComponent, {assessmentId: this.assessmentId,
				updateInfo: updateInfo}, {cssClass: 'thread-popup'});
			if (mobileness == "false"){
				tpopover.then(popover => popover.present({ev: event}));
			} else {
				tpopover.then(popover => popover.present());
			}
		}

		toggleQuestionHistory(){
			this.popOver.create(QuestionHistoryPopoverComponent, {assessmentId: this.assessmentId,
				questionId: this.questionId}, {cssClass: 'question-history-popup'})
			.then(popover => popover.present());
		}

		openMobileNav(){
			console.log(this.noSecondBar);
			var userName = this.auth.currentUser().name;
			this.popOver.create(MobileNavPopoverComponent, {assessmentId: this.assessmentId, userName: userName, noSecondBar: this.noSecondBar}, {cssClass: 'mobile-nav-pop'})
			.then(popover => popover.present());
		}

		// toggleTopbarInfo(){
		// 	this.infoShow = !this.infoShow;
		// }

}