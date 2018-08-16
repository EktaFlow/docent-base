import { Component, Input } from '@angular/core';
import { PopoverController, NavController } from "ionic-angular";
import { ViewsComponent } from "../views/views";
import { RegisterPage } from "../../pages/register/register";
import { LoginPage }    from "../../pages/login/login";
import { AuthService } from "../../services/auth.service";
import { HelpmenuComponent } from "../helpmenu/helpmenu";

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
  selector: 'topbar',
  templateUrl: 'topbar.html'
})

export class TopbarComponent {

	public loginPage		= LoginPage;
	public registerPage = RegisterPage;
	public scope: any;
	public targetMRL: any;
	public targetDate: any;
	public scopeSelected: any;
	@Input() public assessmentId: any;
	// the question info is only relevant for the questions page. whereas the assessments info is relevant for all the pages.
	@Input() private mainTitle: any;
	@Input() private subTitle: any;
	@Input() private questionLevel: any;


constructor( public popOver: PopoverController,
						 public auth:    AuthService,
						 public navCtrl: NavController,
						 private apollo: Apollo ) { }

	ngOnInit() {
		this.assessmentId ? this.getAssessmentData() : null;
	}

	toggleScopeSelected() {
		this.scopeSelected = !this.scopeSelected;
	}

	getAssessmentData() {
		this.apollo.watchQuery<any>({
			query: assessmentQuery,
			variables: {
				_id: this.assessmentId
			}
		}).valueChanges
			.subscribe( ({data, loading}) => {
				console.log(data);
				this.scope		  = data.assessment.scope;
				this.targetMRL  = data.assessment.targetMRL;
				this.targetDate = data.assessment.targetDate;
			}); 
	}

  presentViewsPop(event){
	let popover = this.popOver.create(ViewsComponent, {assessmentId: this.assessmentId});
    popover.present({
      ev: event
    });
  }

	showHelp(event) {
		this.popOver.create(HelpmenuComponent, {assessmentId: this.assessmentId})
		            .present({ev: event});
	}

	registerNav() { this.navCtrl.push( this.registerPage ); }
	loginNav() { alert("Coming soon")} //{ this.navCtrl.push( this.loginPage ); }
	logout() { this.auth.logout()}

}
