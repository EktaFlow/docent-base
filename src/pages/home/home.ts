import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {Subscription} from "rxjs";
import { NgForm } from "@angular/forms";

import { QuestionsPage } from '../questions/questions';
import { RegisterPage } from "../register/register";
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
query{
assessments {
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
   ) {                                                                                              
     createAssessment(                                                                              
       threads:    $threads,                                                                        
       location:   $location,                                                                       
       targetMRL:  $targetMRL,                                                                      
       id:         $id,                                                                             
       scope:      $scope,                                                                          
       targetDate: $targetDate, 
       deskbookVersion: $deskbookVersion,
			 name: $name
     ) {                                                                                                                                                                           
          _id                                                          
                                                                                               
       }                                                                                            
     } 
`
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
	backEnd: any = true;
  acronymsPage = AcronymsPage;
  definitionsPage = DefinitionsPage;
	loading: boolean;
	allThreads: any;
	assessments: any;

	assForm: any = {deskbookVersion: "2017", levelSwitching: false};

  members = [];
	ionicForm = {};
	threadsSelected: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	location: any;

	private querySubscription: Subscription;

  constructor(public navCtrl: NavController,
							public popOver: PopoverController,
							private apollo: Apollo,
							private auth: AuthService) {

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


	// use form?? 
	createAssessment(event) {
		console.log(this.assForm);
		event.preventDefault();
		// TODO: make this into a real function with a front end modal <01-08-18, mpf> //
		!this.validateAssessment() ? alert("you must enter all fields") : null
		if (this.backEnd && this.validateAssessment()) {
		var values = this.assForm;
		values.threads = this.threadsSelected;
		console.log(values);

		this.apollo.mutate({
				mutation:		createAssessmentMutation, 
				variables:	{
				threads:				values.threads,
				location: values.location,
				targetMRL:				values.targetMRL, 
				name: values.name,
				levelSwitching:		!!values.levelSwitching,
				deskBookVersion:	values.deskBookVersion,
				scope: values.scope,
				targetDate: values.targetDate,

				}
		})
			.subscribe(({data}) => {
					this.page_2(data.createAssessment._id);
			});
		}
	}

	async ngOnInit() {
	await this.checkBack();
	if (this.backEnd) {

	// setting defaults, ionic is weird with this.
	//document.getElementById("level-switching-select").value = "";
        //have to cast to HTMLInputElement which contains value prop
        var tmp = <HTMLInputElement>document.getElementById("level-switching-select");
        tmp.value = "";
        tmp = <HTMLInputElement>document.getElementById("deskbook-select");
	tmp.value = "2017";

	this.querySubscription = this.apollo.watchQuery<any>({
		query: assessmentQuery
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
				this.allThreads = data.allThreadNames.map(a => ({name: a, index: data.allThreadNames.indexOf(a) + 1}))
		 });
	}
	}


	////////// METHODS TO LAUNCH POPOVERS //////////////////////////////
	// TODO:  abstract general popover logic<01-08-18, mpf> //
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

  addMember(nameIn:string,roleIn:string){
    var newMember = {name: nameIn, role: roleIn};
    this.members.push(newMember);
  }

  removeMember(){
    this.members.pop()
  }

  questions(date,val,loc){
    this.navCtrl.push(QuestionsPage,{
      mrl: val,
      date: date,
      location: loc
    });
  }

  page_2(_id){
    this.navCtrl.push(QuestionsPage,{
		data: _id });}
			
helpButtonClick() { alert("Coming soon")} //{ this.navCtrl.push( this.loginPage ); }
}

