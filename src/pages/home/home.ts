import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {Subscription} from "rxjs";
import { NgForm } from "@angular/forms";
import { HttpClient } from '@angular/common/http';


import { QuestionsPage } from '../questions/questions';
import { LoginPage }    from "../login/login";
import { ReviewPage } from '../review/review';
import { DashboardPage } from '../dashboard/dashboard';
import { NavigatePage } from '../navigate/navigate';
import { NotapplicablePage } from '../notapplicable/notapplicable';
import { SkippedquestionsPage } from '../skippedquestions/skippedquestions';
import { ActionitemsPage } from '../actionitems/actionitems';

import { AcronymsPage } from '../acronyms/acronyms';
import { DefinitionsPage } from '../definitions/definitions';
import { HelpmenuComponent } from '../../components/helpmenu/helpmenu';
import { AssessmentslistComponent } from "../../components/assessmentslist/assessmentslist";
import { ThreadsListComponent } from "../../components/threads-list/threads-list";
import { AuthService } from "../../services/auth.service";
import { TopbarComponent } from "../../components/topbar/topbar";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { BackUrl } from "../../services/constants";

var assessmentQuery = gql`
query assessments($userId: String){
assessments(userId: $userId) {
	_id
	name
	targetMRL
	}
	}
`
var threadsQuery = gql`
query {
	allThreadNames
}
`
var oneAssessment = gql`
query assessment($id: Int!){
	assessment(id: $id) {
questions {
	threadName
}
}

}
`
var createAssessmentMutation = gql`
 mutation createAssessment(
     $threads:     [Int],
     $location:    String,
     $targetMRL:   Int,
     $id:          Int,
     $scope:       String,
     $targetDate:  Date,
		 $deskbookVersion: String,
     $name: String
		 $levelSwitching: Boolean
		 $userId: String
		 $teamMembers: [String]
     $schema: String
   ) {
     createAssessment(
       threads:    $threads,
       userId:     $userId,
       location:   $location,
       targetMRL:  $targetMRL,
       id:         $id,
       scope:      $scope,
       targetDate: $targetDate,
       deskbookVersion: $deskbookVersion,
			 name: $name,
			 teamMembers: $teamMembers,
			 levelSwitching: $levelSwitching
       schema: $schema
     ) {
          _id

       }
     }
`
//goes into graphql
//teamMembers: $teamMembers,
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  public mainTitle;
	backEnd: any = true;
  acronymsPage = AcronymsPage;
  definitionsPage = DefinitionsPage;
	loading: boolean;
	allThreads: any;
	assessments: any;
  schema: any;

	assForm: any = {deskbookVersion: "2017", levelSwitching: false, teamMembers: []};

  members = [];
	ionicForm = {};
	threadsSelected: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	location: any;
	private currentUser: any;
	private showRegister: boolean = false;


	private querySubscription: Subscription;

  constructor(public navCtrl: NavController,
							public popOver: PopoverController,
							private apollo: Apollo,
							private auth: AuthService,
              private http: HttpClient) {
	    this.mainTitle = "Start";
	}

	getSchema() {
		this.http.get('assets/json/2016.json')
					.subscribe( data => {
						console.log(data);
						this.schema = data;
					});
	}

		async checkBack() {
							await fetch(BackUrl)
								.then(a => console.log("connected"))
								.catch(e => { this.backEnd = false; console.log("nope"); });
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

	handleUnloggedUser() {
		alert("You must be a registered Docent user to begin an assessment");
	}


	// use form??
	createAssessment(event) {
	console.log("fire");
		event.preventDefault();
		// TODO: make this into a real function with a front end modal <01-08-18, mpf> //
		var values = this.assForm;
		values.threads = this.threadsSelected;
    var fakeTeamMember = { email: "cool@cool.net", role: "it's cool"}

		console.log(this.assForm.teamMembers);
		var teamMembers = this.assForm.teamMembers.map(a => a.email)
		console.log(teamMembers);

		this.apollo.mutate({
				mutation:		createAssessmentMutation,
				variables:	{
					threads:					values.threads,
					location:					"cool",
					targetMRL:				6,
					name:							"cool",
					levelSwitching:		false,
					deskBookVersion:	"2017",
					scope:						"aaaaaaaaaaaaa",
					teamMembers,
          schema: JSON.stringify(this.schema),
					// targetDate: new Date,
					userId: "dev"
				}
		})
			.subscribe(({data}) => {
					var assessmentId = data.createAssessment._id;
					this.sendEmailsToTeamMembers(assessmentId);
					this.page_2(assessmentId);
			});
	}

	async sendEmailsToTeamMembers(assessmentId) {
		console.log("sending");
		var teamMembers = this.assForm.teamMembers.map(mem => mem.email);
		console.log(teamMembers);

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

	async ngOnInit() {

	// setting defaults, ionic is weird with this.
	//document.getElementById("level-switching-select").value = "";
        //have to cast to HTMLInputElement which contains value prop
        var tmp = <HTMLInputElement>document.getElementById("level-switching-select");
        tmp ? tmp.value = "" : null
        tmp = <HTMLInputElement>document.getElementById("deskbook-select");
	tmp ? tmp.value = "2017" : null;

	// if (this.currentUser) {
	// var userId = JSON.parse(this.currentUser).userId;

	var userId = "dev";
	// console.log(userId);

	this.querySubscription = this.apollo.watchQuery<any>({
		query: assessmentQuery,
		variables: {
			userId
		}
		})
		 .valueChanges
		 .subscribe(({data, loading}) => {
		 this.loading = loading;
		 this.assessments = data.assessments
		 });
	this.querySubscription = this.apollo.watchQuery<any>({
		query: threadsQuery
		})
		 .valueChanges
		 .subscribe(({data, loading}) => {
       console.log("READY");
				this.allThreads = data.allThreadNames.map(a => ({name: a, index: data.allThreadNames.indexOf(a) + 1}))
		 });

    this.getSchema();

	// }
	}


	////////// METHODS TO LAUNCH POPOVERS //////////////////////////////
	// TODO:  abstract general popover logic<01-08-18, mpf> //

	showRegisterForm = () => this.showRegister = true;

	showAssessmentsList(myEvent) {
	var popoverClick = this.popOver.create(AssessmentslistComponent, {assessments: this.assessments});
		popoverClick.present();
	}

  showPopover(myEvent) {
    var popoverClick = this.popOver.create(HelpmenuComponent, {}, {cssClass: 'help-menu'});
      popoverClick.present({
        ev: myEvent
      });
    }

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
		threadsSelected.includes(thread) ?
		threadsSelected = threadsSelected.filter(a => a !== thread) :
		threadsSelected.push(thread)

		threadsSelected.sort((a,b) => a-b);
	}

  addMember(emailIn:string,roleIn:string){
    var newMember = {email: emailIn, role: roleIn};
    this.members.push(newMember);
    this.assForm.teamMembers.push(newMember);
    console.log(this.assForm.teamMembers);
  }

  removeMember(){
    this.members.pop();
    this.assForm.teamMembers.pop();
  }

  questions(date,val,loc){
    this.navCtrl.push(QuestionsPage,{
      mrl: val,
      date: date,
      location: loc
    });
  }

  page_2(_id){
    this.navCtrl.push(QuestionsPage,{ data: _id } );
  }

    helpButtonClick() { alert("Coming soon"); }



}
