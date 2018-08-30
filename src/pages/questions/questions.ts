import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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
		helpText
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

	private vals = {};
	assessmentId: any;
	public helpClicked: boolean = false;
	private questionId: any; 
	files = [];
	private allQuestions;
	private referringQuestionId: any;
	private targetMRL;
	private currentQuestion: any = {};
	private surveyQuestions;
	private levelSwitching: any;

	constructor(public navCtrl:            NavController, 
              public navParams:          NavParams, 
							private popoverController: PopoverController, 
							private apollo:            Apollo ) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY?
		this.referringQuestionId = navParams.data.questionId;
		this.assessmentId = navParams.data.data;
  }
	
  /////////////////////////// useful functions ///////////////////////
	// return a question by its questionId
	getQuestion = (id) => this.allQuestions[id - 1]

	allSubthreadQuestions(question = this.currentQuestion) {
		return this.allQuestions
		           .filter(q => q.subThreadName == question.subThreadName);
	}

	allSubthreadLevelQuestions(question = this.currentQuestion) {
		return this.allQuestions
		           .filter(q => q.subThreadName == question.subThreadName)
		           .filter(q => q.mrLevel == question.mrLevel );
	}
	/////////////////////////////////////////////////////////////////////
	// INIT && related function 
  ngOnInit() {
	// if we don't already have a loaded assessment.
		this.apollo.watchQuery<any>({
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
				this.determineCurrentQuestion()
				this.vals = this.filterQuestionVals(this.currentQuestion);

				this.setInstanceVariables(assessment);

		})

  }

	setInstanceVariables(assessment) {
		this.levelSwitching = assessment.levelSwitching	
	}

	setSurveyQuestions() {
		var { targetMRL,
					allQuestions } = this;

    return allQuestions.filter( q => q.mrLevel == targetMRL )
		                   .map( q => q.questionId);
	}

	determineCurrentQuestion() {
		var { referringQuestionId, 
					currentQuestion,
          getQuestion } = this;

		if (referringQuestionId ) {
			this.currentQuestion = getQuestion(referringQuestionId);
		}
		else {
			var noAnswer = this.surveyQuestions.find( qId => {
				return getQuestion(qId).currentAnswer == null
			})
			this.currentQuestion = getQuestion(noAnswer);
		}
	}

	////////////////// CLICK HANDLERS //////////////////////////////////
	/////////////////////////// popover creator(s) /////////////////////
	showFileUpload() {
			let myEmitter = new EventEmitter<any>();
				myEmitter.subscribe( v =>  {
				this.files.push(v);
			});

			this.popoverController
				.create(FileUploadPopoverComponent, 
					{
						emitter: myEmitter, 
						questionId: this.questionId, 
						assessmentId: this.assessmentId 
					}, 
					{	cssClass: "upload-popover"})
				.present();
	}

	///////////////////////// next / prev / etc /////////////////////////////
	async handleNextPageClick() {
		this.setValues();
		this.levelSwitching ? this.handleLevelSwitching() : this.moveCurrentQuestion(1)
		this.vals = this.currentQuestion;
	}

	async	handlePreviousPageClick() {
		this.setValues();
		this.moveCurrentQuestion(-1);
		this.vals = this.currentQuestion;
	}

	/////////////////////////////////////////////////////////////////////////
	///////////// FUNCTIONS DEALING WITH VALUE SETTING /////////////////////

	///// any modification of the inputs needed to be used in the assessment
	///// update function
	setValues() {
		var values: any = Object.assign({}, this.vals)
		values.currentAnswer === null ? values.currentAnswer = "skipped" : null
		values = this.filterQuestionVals(values);

		this.updateAssessment(values)
	}

	// refactor this down
	async updateAssessment(values) {
		var a = this.allQuestions.find(a => a.questionId == this.currentQuestion.questionId);
		var old = this.allQuestions.map( q => Object.assign({}, q));
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


	moveCurrentQuestion(way) {
		var { questionId } = this.currentQuestion;	

		if (!this.surveyQuestions.includes(this.currentQuestion.questionId)) {
			alert("what is the order when a rando question gets added in?");
			this.currentQuestion = this.getQuestion(this.surveyQuestions[0]);
		}
		else {
			var place = this.surveyQuestions.indexOf(questionId) + way;
			var newQuestion = this.surveyQuestions[place];
			this.currentQuestion = this.getQuestion(newQuestion);
		}
	}

	nextUnansweredQuestion() {
			// the humble while loop
			var place = 0;
			while (this.currentQuestion.currentAnswer) {
				place += 1;
				this.currentQuestion = this.getQuestion(this.surveyQuestions[place]);
			}
			// if all questions are answered? 
	}

	//////////////////////////////// 
	////////// LEVEL SWITCHING ONLY functions
	///////////////////////////////

	handleLevelSwitching() {
				if ( !this.threadAnswered()) {
					this.moveCurrentQuestion(1);
				}
				// make sure this encompasses all non-switching scenarios.
				else if ( this.threadPassed() ) {
					this.nextUnansweredQuestion();
					// launch some type of thread passed UI change?? 
        } 
				else if ( this.hasFloorLevel() ) {
					this.moveCurrentQuestion(1);
				}
				else {
					alert("You have failed this subthread, you will be shown questions from this subthread at the next lowest level");
					this.launchLevelSwitchModal();
				}
	}

	// FUNCTIONS to handle the different branches on level-switching 
	// Does every question within the currentQuestion's subthread and MRL have an answer? 

	threadAnswered() {
		var {mrLevel, subThreadName} = this.currentQuestion;

		return this.allQuestions.filter(q => q.mrLevel == mrLevel && q.subThreadName == subThreadName)
		                 .every(q => (<any>["Yes", "No", "N/A"]).includes(q.currentAnswer))


	}
  
	// the only way to 'fail' a subthread is to have a no answer. 
	threadPassed() {
		return !this.allQuestions.filter(q => q.subThreadName == this.currentQuestion.subThreadName)
					        .filter(q => q.mrLevel == this.currentQuestion.mrLevel)
									.some( q => q.currentAnswer == "No")
	}

	// If a subthread is complete at a lower level, we've found the floor, so no need to bounce
	// user back again.
	// this needs some more testin
	hasFloorLevel() {
	  // start with current Question;
		var {currentQuestion} = this;
		var currentSubthread = this.allSubthreadQuestions();
		var floor = false;

		currentSubthread.forEach(q => {
			var level = this.allSubthreadLevelQuestions(q)
			console.log(level);
			level.every(ques => ["Yes", "Skipped", "skipped", "N/A"].includes(ques.currentAnswer) ) ? floor = true : null
		});

		console.log(floor);
		return floor;
	}

	launchLevelSwitchModal() {
		this.addLowerMRL();
	}

	addLowerMRL() {
    var nextLowest = this.allQuestions
                       .filter(q => q.subThreadName == this.currentQuestion.subThreadName)
											 .filter(q => q.mrLevel == this.currentQuestion.mrLevel - 1)
											 .map(q => q.questionId);

 	  var newSurvey = [...nextLowest, ...this.surveyQuestions].sort( (a,b) => a - b)
	  this.surveyQuestions = newSurvey;

	  this.currentQuestion = this.getQuestion(nextLowest[0]);
	}

	///////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////

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

	public onHelpClicked(){
		this.helpClicked = !this.helpClicked;
	}

}
