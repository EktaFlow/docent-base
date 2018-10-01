/*
*   The purpose of the Home Page is (currently) to both diplay the login information
*		and create a new assessment. 
*   TODO: mpf - split this into a loginpage and a newassessment page
*/

import { Component, EventEmitter } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { QuestionsPage } from '../questions/questions';
import { ThreadsListComponent } from "../../components/threads-list/threads-list";
import { AuthService } from "../../services/auth.service";
import { AssessmentService } from "../../services/assessment.service";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


var threadsQuery = gql`
query {
	allThreadNames
}
`

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
	loading: boolean;
	allThreads: any;
	assessments: any;
  schema: any;
	assForm: any = {deskbookVersion: "2017", levelSwitching: false, teamMembers: []};
  members = [];
	threadsSelected: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	private showRegister: boolean = false;

  constructor(public navCtrl: NavController,
							public popOver: PopoverController,
							private apollo: Apollo,
							private auth: AuthService,
              private assessmentService: AssessmentService,
              private http: HttpClient) {}

	getSchema() {
		this.http.get('assets/json/2016.json')
					.subscribe( data => {
						this.schema = data;
            // this.schema = data;
					});
	}

	validateAssessment() {
		var fields = [
			"name",
			"targetMRL",
      "scope",
      "location",
			"targetDate",
		];

		return fields.every(field => this.assForm[field])
	}

	async createAssessment(event) {
		event.preventDefault();
		var variables = this.formatAssessmentVariables();
		//  debug what is getting passed into the mutation: 
		var newAssessment = await this.assessmentService.createAssessment(variables);
		newAssessment.subscribe(({data}) => {
					var assessmentId = data.createAssessment._id;
					this.sendEmailsToTeamMembers(assessmentId);
					this.startAssessment(assessmentId);
		});
	}

	developmentVariables() {
		// add this if we want to bring back the quick way to start assessments for dev.
	}

	formatAssessmentVariables() {
		var formValues = this.assForm;
		return {
			threads:          this.threadsSelected,
			location:         formValues.location,
			targetMRL:        formValues.targetMRL, 
			name:             formValues.name,
			levelSwitching:   formValues.levelSwitching,
			deskBookVersion:  formValues.deskBookVersion,
			teamMembers:      formValues.teamMembers.map(a => a.email),
			userId:						this.auth.currentUser()._id,
			scope:            formValues.scope,
			targetDate:       formValues.targetDate,
      schema:           JSON.stringify(this.schema),
		};
	}

	async sendEmailsToTeamMembers(assessmentId) {
		var teamMembers = this.assForm.teamMembers.map(mem => mem.email);

		// move this to constants when we decide it's home.
		var url = "http://localhost:4002/share";
	// this makes sense in auth b/c we probably do want some user checking here, right?
		fetch(url, {
			method: "POST",
			headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
				},
			body: JSON.stringify({
				recipients: teamMembers,
				assessmentId
			})
		})
		.then(a => console.log("okok"))
		.catch(e => console.error(e));
	}

	// this function sets a couple default values and brings in the threads
	async ngOnInit() {
	// setting defaults, ionic is weird with this.
  //have to cast to HTMLInputElement which contains value prop
    var tmp = <HTMLInputElement>document.getElementById("level-switching-select");
    tmp ? tmp.value = "" : null
    tmp = <HTMLInputElement>document.getElementById("deskbook-select");
	  tmp ? tmp.value = "2017" : null;

		this.apollo.watchQuery<any>({
			query: threadsQuery
			})
			 .valueChanges
			 .subscribe(({data, loading}) => {
					this.allThreads = data.allThreadNames.map(a => ({name: a, index: data.allThreadNames.indexOf(a) + 1}))
			 });
    this.getSchema();
	}

	////////// METHODS TO LAUNCH POPOVERS //////////////////////////////
	// TODO:  abstract general popover logic<01-08-18, mpf> //

	showRegisterForm = () => this.showRegister = true;

	showThreads(myEvent) {
		myEvent.preventDefault();

		let myEmitter = new EventEmitter<any>();
		myEmitter.subscribe( v =>  this.toggleThread(v.index));

		var popoverClick = this.popOver.create(ThreadsListComponent, {allThreads: this.allThreads, emitter: myEmitter, threadsSelected: this.threadsSelected});
      popoverClick.present({
        ev: myEvent
      });
	}

	toggleThread(thread) {
		var {threadsSelected} = this;
		if ( threadsSelected.includes(thread) ) {
			threadsSelected = threadsSelected.filter(a => a !== thread)
		}
		else { threadsSelected.push(thread) } 

		threadsSelected.sort((a,b) => a-b);
	}

  addMember(emailIn:string,roleIn:string){
    var newMember = {email: emailIn, role: roleIn};
    this.members.push(newMember);
    this.assForm.teamMembers.push(newMember);
  }

  removeMember(){
    this.members.pop();
    this.assForm.teamMembers.pop();
  }

  startAssessment(_id){
    this.navCtrl.push(QuestionsPage,{ assessmentId: _id } );
  }

}
