import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import * as Survey from 'survey-angular';
import { ReviewPage } from '../review/review';
import { ViewsComponent } from '../../components/views/views';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { TopbarComponent } from "../../components/topbar/topbar";
import {FileUploadPopoverComponent} from "../../components/file-upload-popover/file-upload-popover";

var assessmentQuery = gql`
query assessment($_id: String) 
{
 assessment(_id: $_id)  {
	questions{
	  currentAnswer
    threadName
    subThreadName
    mrLevel
		questionId
		questionText
		objectiveEvidence
		assumptionsYes
		notesYes
		notesSkipped
		assumptionsSkipped
		who
		when
		technical
		cost
		schedule
		what
		reason
		assumptionsNo
		notesNo
		documentation
		assumptionsNA
		notesNA
  }
	targetMRL
	currentMRL
	levelSwitching
	files {
		url
	}
}
}
`

var updateAssessmentQuery = gql`
mutation updateAssessment($_id: String!, $questionId: Int, $updates: QuestionUpdate) {
	updateAssessment(_id: $_id, questionId: $questionId, updates: $updates) {
		scope
    location
	}
	}
`

var questionQuery = gql`
query question($questionId: Int, $assessmentId: String) {
	question(questionId: $questionId, assessmentId: $assessmentId) {
		currentAnswer
		questionText
		threadName
	}
}
`

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})


export class QuestionsPage {

	/// Object to hold the different vars for the follow-up questions
	private vals = {};

	assessmentId: any;
	assessmentSubscription: any;

  public mainTitle;
  public subTitle;
	public filtered: any;
	public survey: any;
	private questionId: any; 
	files = [];
	private current;
	public test;
	private allQuestions;
	private referringQuestionId: any;
	private lastQuestion;
	private targetMRL;
	public questionLevel;
	private currentQuestion = {};
	private surveyQuestions;

	// properties of the current assessment that we're using for different functions
	public currentMRL: any;
	public levelSwitching: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
							private popoverController: PopoverController, private apollo: Apollo) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY? 
		this.referringQuestionId = navParams.data.questionId;
		this.assessmentId = navParams.data.data;
  }

	showFileUpload(event) {
	let myEmitter = new EventEmitter<any>();
			myEmitter.subscribe( v =>  {
				this.files.push(v);
			});

	var fileUploadPopover = this.popoverController.create(FileUploadPopoverComponent, 
			{
				emitter: myEmitter, 
				questionId: this.questionId, 
				assessmentId: this.assessmentId 
			}, 
			{	cssClass: "upload-popover"});
		fileUploadPopover.present();
	}

	async handleNextPageClick() {
		// set the new vals
		this.setValues();
		// move to the new question
		this.levelSwitching ? this.handleLevelSwitching() : this.nextQuestion()

		// reset the values to the new ones.
		this.vals = this.currentQuestion;
	}

	async	handlePreviousPageClick() {
		this.setValues();
		this.nextQuestion(-1);
		this.vals = this.currentQuestion;
	}

	setValues() {
		this.updateAssessment(this.vals)
	}

	async updateAssessment(values) {

		var values = Object.assign({}, values)
		values = this.filterQuestionVals(values);

		var a = this.allQuestions.find(a => a.questionId == this.currentQuestion.questionId);
		var old = this.allQuestions.map( q => Object.assign({}, q));

		// in the allQuestions array we want to replace the current object @ position x
		// and replace it with the updated information.

		var newer = old[this.currentQuestion.questionId - 1];

		for (let a in values) {
			newer[a] = values[a];
		}

		var temp = JSON.parse(JSON.stringify(this.allQuestions));
		temp.splice(this.currentQuestion.questionId - 1, 1, newer);
		this.allQuestions = temp;

		await this.apollo.mutate({
			mutation: updateAssessmentQuery,
			variables: {
				_id:				this.assessmentId,
				questionId: Number(this.currentQuestion.questionId),
				updates:		values
			}
		}).subscribe(data => null);
	}

	nextQuestion(way) {
	  !way ? way = 1 : null
		var { questionId } = this.currentQuestion;	

		var place = this.surveyQuestions.indexOf(questionId) + way;
		var newQuestion = this.surveyQuestions[place];

		this.currentQuestion = this.getQuestion(newQuestion);
	}

	handleLevelSwitching() {
				if ( !this.endOfThread() ) {
					console.log("not end of thread");
					this.nextQuestion(1);
				}
				// make sure this encompasses all non-switching scenarios.
				else if ( this.threadPassed() ) {
					console.log("end of thread, but passed")
					this.nextQuestion(1);
        } 
				else {
					alert("You have failed this subthread, you will be shown questions from this subthread at the next lowest level");
					console.log("end of thread, with failure");
					this.launchLevelSwitchModal();
				}
	}

	endOfThread = () =>  this.currentQuestion.subThreadName != this.checkNextQuestion().subThreadName
	
	checkNextQuestion() {
		var ok = this.surveyQuestions.indexOf(this.currentQuestion.questionId);
		var next = this.surveyQuestions[ok + 1]
		return this.getQuestion(next);
	}

	threadPassed() {
		return !this.allQuestions.filter(q => q.subThreadName == this.currentQuestion.subThreadName)
					        .filter(q => q.mrLevel == this.currentQuestion.mrLevel)
									.some( q => q.currentAnswer == "No")
	}

	launchLevelSwitchModal() {
		this.addLowerMRL();
		// launch the popover.	

	  // popover;
    // you answered no to: questions...	

		// presenting questions from lower mrl.

		// if (this is the lowest level available for this subThread).
		// 

		// what would you like to do?
		// see if i meet mrlevel (lower)? for this subthread?
		// continue on

		// remember this choice for all failures.
	}

	addLowerMRL() {
	  // this will always be based on currentQuestion, so no need to keep a separate var
		// get the qids for qs of the same subthread at the nextlowest MRL.
    var nextLowest = this.allQuestions
                       .filter(q => q.subThreadName == this.currentQuestion.subThreadName)		
											 .filter(q => q.mrLevel == this.currentQuestion.mrLevel - 1)
											 .map(q => q.questionId);

											 var newSurvey = [...nextLowest, ...this.surveyQuestions].sort( (a,b) => a.questionId - b.questionId)
											 this.surveyQuestions = newSurvey;

											 this.currentQuestion = this.getQuestion(nextLowest[0]);
	}


	// this function takes an arr of questions as assessment sub-documents 
	// and formats them to be in the surveyJs format.
	// this is the format that survey JS is expecting, so we don't 
	// mess with the structure.
	mapToSurveyJS(questions) {
		return questions.map( question => {
			return {
				name: question.threadName,
				elements: [{
					type: "dropdown",
					name: question.subThreadName,
					title: question.questionText,
					choices: [
						"Yes",
						"No",
						"N/A"
					]
				}]
			};
		});
	}

	// this function requires this.surveyJS && this.current to be set.. 
	setInstanceVariables(assessment) {
		this.levelSwitching = assessment.levelSwitching	
		// this.files = data.assessment.files;

		// TODO:  There's a better way to get these values from the assessment object <01-08-18, mpf> 
	}

	getQuestion(id) {
		return this.allQuestions[id - 1];
	}

	setSurveyQuestions() {
		var { targetMRL,
					allQuestions } = this;

    return allQuestions.filter( q => q.mrLevel == targetMRL )
		                   .map( q => q.questionId);
	}

	// What data do we actually need to store in instance vars?
  ngOnInit() {
	// if we don't already have a loaded assessment.
		this.assessmentSubscription = this.apollo.watchQuery<any>({
			query: assessmentQuery,
			fetchPolicy: "network-only",
			variables: {_id: this.assessmentId}
		})
			.valueChanges
			.subscribe( ({data, loading}) => {  
				var {assessment} = data;
				this.allQuestions = assessment.questions;
				this.targetMRL = assessment.targetMRL;
				this.surveyQuestions = this.setSurveyQuestions()
				// add if no currentQuestionId
				var currentQuestionId = this.surveyQuestions[0];
				this.currentQuestion = this.getQuestion(currentQuestionId);
				// this.vals = this.currentQuestion;
				this.vals = this.filterQuestionVals(this.currentQuestion);

				this.setInstanceVariables(assessment);

		})

  }

	filterQuestionVals(question) {
		// better way to do this.
		var filteredQuestions = {};
		var questionVals = [
			"objectiveEvidence",
			"assumptionsYes",
			"notesYes",
			"notesSkipped",
			"assumptionsSkipped",
			"who",
			"when",
			"technical",
			"cost",
			"schedule",
			"what",
			"reason",
			"assumptionsNo",
			"notesNo",
			"documentation",
			"assumptionsNA",
			"notesNA",
			"currentAnswer"
		];

		questionVals.forEach(val => filteredQuestions[val] = question[val]);

		return <any>filteredQuestions;

	}

}

