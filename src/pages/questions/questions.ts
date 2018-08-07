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
    skipped
		questionId
    threadName
    subThreadName
    mrLevel
		questionId
		questionText
		objectiveEvidence
		assumptionsYes
		notesYes
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
  public value;
  public mainTitle;
  public subTitle;
	public filtered: any;
	public survey: any;
	public surveyJS: any;
	private questionId: any; 
	files = [];
	private current;
	public test;
	public questionAnswered: any;
	private referringQuestionId: any;

	// properties of the current assessment that we're using for different functions
	public currentMRL: any;
	public levelSwitching: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
							private popoverController: PopoverController, private apollo: Apollo) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY? 
		this.referringQuestionId = navParams.data.questionId;
		this.assessmentId = navParams.data.data;
		var surveyJSRoot = document.getElementById("surveyElement");
		surveyJSRoot ? surveyJSRoot.remove() : null;
  }

	showFileUpload(event) {
	let myEmitter = new EventEmitter<any>();
		myEmitter.subscribe( v =>  {
		this.files.push(v);
})

	var fileUploadPopover = this.popoverController.create(FileUploadPopoverComponent, {emitter: myEmitter, questionId: this.questionId, assessmentId: this.assessmentId });
		fileUploadPopover.present({ ev: event });
	}

  surveyChange(){
		// values needs to stay here because it's tied to the conditional rendering.
    // if undefined, skipped
		if (this.surveyJS) {
			var {pages, currentPageNo} = this.surveyJS;
			// TODO - clean this up below
			// this.value = this.surveyJS.getValue(pages[currentPageNo].elements[0].name)
			this.checkNextQuestion(currentPageNo);
			this.value = pages[currentPageNo].propertyHash.elements["0"].value;
			this.mainTitle = pages[currentPageNo].name
			this.subTitle = pages[currentPageNo].elements[0].name
		}
  }

	resetSelect() {
		setTimeout( () => {
			var control: any = document.querySelector(".sv_q_dropdown_control")
																 .firstChild
			control.selected = true; 
			this.value = undefined;
		}, 200);
	}

	updateAssessment(values) {

	// var values = Object.assign({}, values)

		// check for skipped;
		if ( this.value ) { values.currentAnswer = this.value  }
		else {
			//var values = {};
                        var values: any;
			values.currentAnswer = "skipped"
		}

		var ok = {};
		var sweet = this.current;
		var {pages, currentPageNo} = this.surveyJS;

		for (let obj in sweet[currentPageNo]) {
			ok[obj] = sweet[currentPageNo][obj]
		}

		for (let xx in values) {
			ok[xx] = values[xx]
		}

		//ok is the updated object.

		sweet[currentPageNo] = ok

		this.current = sweet;

		console.log(this.assessmentId);
		console.log(Number(this.questionId));
		console.log(values);

		this.apollo.mutate({
			mutation: updateAssessmentQuery,
			variables: {
				_id:				this.assessmentId,
				questionId: Number(this.questionId),
				updates:		values
			}
		}).subscribe(data => console.log(data));
	}
	
	setValues() {
	this.value == "Yes" ? this.updateAssessment(this.vals) : null;
	this.value == "No"  ? this.handleNo(this.vals)  : null;
	this.value == "N/A" ? this.updateAssessment(this.vals)  : null;
	!this.value ? this.updateAssessment(null) : null; 
}

	// no has its own handler, because a no can require a change in the overall assessment 
	// mrLevel.
	handleNo(values) {
		this.levelSwitching ? values.currentMRL = this.currentMRL - 1 : null
		// move the targetMRL level down
		// access the current targetMRL
		this.updateAssessment(values);
	}

	getQuestion(questionId) {
		this.apollo.watchQuery({
		query: questionQuery,
		fetchPolicy: "network-only",
		variables: {
			assessmentId: this.assessmentId,
			questionId
		}
		}).valueChanges
		  .subscribe(a => console.log(a));

	}

	async handleNextPageClick() {

		this.setValues();
		await this.surveyJS.nextPage();
		var { currentPageNo, pages } = this.surveyJS;
		// resets the select bar.
		this.checkNextQuestion(currentPageNo);
		//		this.resetSelect();
		this.questionId = this.current[currentPageNo].questionId;
	}

	checkNextQuestion(index) {
		this.current[index].currentAnswer ? this.questionAnswered = true : this.questionAnswered = false
	}

async	handlePreviousPageClick() {
		await this.surveyJS.prevPage();
		var { currentPageNo, pages } = this.surveyJS;
		this.questionId = this.current[currentPageNo].questionId;
		this.checkNextQuestion(currentPageNo);
		// this.resetSelect();
	}

	moveQuestionToFront(questionSet, referringQuestionId) {
		var frontQuestion = questionSet.filter(q => q.questionId == referringQuestionId);	
		var removedFront  = questionSet.filter(q => q.questionId != referringQuestionId);
		
		return frontQuestion.concat(removedFront);
	}

	// Any rules to order the questions in certain ways goes in this function.
	orderQuestions(questionSet) {
		var sorted = questionSet.sort((a,b) => a.questionId - b.questionId)	
		if ( this.referringQuestionId ) {
			sorted = this.moveQuestionToFront(questionSet, this.referringQuestionId);
		}	

		return sorted;
	}

	loadQuestion(array)	 {
	  // TODO - separate out the filters, single function.
		var defaultFilter = a => !a.currentAnswer
		var referringQuestionFilter = a => !a.currentAnswer || a.questionId == this.referringQuestionId
		//////

		var ordered = this.orderQuestions(array);
		var filtered;
		this.referringQuestionId ? 
			filtered = ordered.filter(referringQuestionFilter) :
			filtered = ordered.filter(defaultFilter)
		return filtered;
	}

  // this function takes questions as assessment sub-documents and formats them
	// to be in the surveyJs format.
	// this is the format that survey JS is expecting, so we don't mess with the
	// structure.
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

	filterByMRL(assessment) {
		return assessment.questions.filter(question => {
			return question.mrLevel == assessment.targetMRL;
		})	
	}

	formatSurvey(assessment) {
		var filteredQuestions = this.filterByMRL(assessment);
		var current           = this.loadQuestion(filteredQuestions);
		this.current = current;
		var pages             = this.mapToSurveyJS(current);

		// other surveyJS options, if we need them at some point, can be passed in here.
		return {
				showNavigationButtons: false,
				showQuestionNumbers: "off",
				pages 	
		};
	}

	// this function requires this.surveyJS && this.current to be set.. 
	setInstanceVariables(assessment) {
		var { currentPageNo, pages } = this.surveyJS;

		this.currentMRL = assessment.currentMRL
		this.levelSwitching = assessment.levelSwitching	
		// this.files = data.assessment.files;

		// TODO:  There's a better way to get these values from the assessment object <01-08-18, mpf> 
		this.questionId = this.current[currentPageNo].questionId;
		pages[currentPageNo] ? this.mainTitle = pages[currentPageNo].name : null
		pages[currentPageNo] ? this.subTitle = pages[currentPageNo].elements[0].name : console.log(pages)
	}

	// this function takes an assessment, formats it to comply w/ surveyJS, creates the survey JS object, renders that to the page
	createSurveyJS(assessment) {
		var survey = this.formatSurvey(assessment);
		this.surveyJS = new Survey.Model( survey );
  	Survey.SurveyNG.render("surveyElement", { model: this.surveyJS });
	}

	// What data do we actually need to store in instance vars?
  ngOnInit() {
		this.assessmentSubscription = this.apollo.watchQuery<any>({
			query: assessmentQuery,
			fetchPolicy: "network-only",
			variables: {_id: this.assessmentId}
		})
			.valueChanges
			.subscribe( ({data, loading}) => {  
				var {assessment} = data;

				this.createSurveyJS(assessment);
				this.setInstanceVariables(assessment);
				this.referringQuestionId ? this.setExistingValues() : null
		})

  }

	setExistingValues() {
		var question = this.current.filter(a => a.questionId == this.referringQuestionId)[0];
		this.vals = this.filterQuestionVals(question);
		var test = this.filterQuestionVals(question).currentAnswer;
		var tmp = <HTMLInputElement>document.querySelector(".sv_q_dropdown_control");
                tmp.value = test;
		this.value = test;
	}

	filterQuestionVals(question) {
		// better way to do this.
		var filteredQuestions = {};
		var questionVals = [
			"objectiveEvidence",
			"assumptionsYes",
			"notesYes",
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
		console.log(filteredQuestions);
		return <any>filteredQuestions;
	}

  presentViewsPop(event){
    let popover = this.popoverController.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }
}

