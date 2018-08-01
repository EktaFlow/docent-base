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

	/// Objects which will hold the different vars for the follow-up questions
	private noVals  = {};
	private naVals  = {};
	private yesVals = {}; 
	assessmentId: any;
	assessmentSubscription: any;
  public value;
  public mainTitle;
  public subTitle;
	public filtered: any;
	public survey: any;
	public surveyJS: any;
	private questionId: any; //= this.questionIds[this.surrveyJS.currentPageNo]
	files = [];
	private current;
	public test;
	public questionAnswered: any;

	// properties of the current assessment that we're using for different functions
	public currentMRL: any;
	public levelSwitching: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
							private popoverController: PopoverController, private apollo: Apollo) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY? 
		this.assessmentId = navParams.data.data;
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
	console.log("we fire");	
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


	  if (!values) { values = {skipped: true}}
		values.currentAnswer = this.value;

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
		console.log(sweet);

		this.current = sweet;

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
	console.log("set values fires");
	this.value == "Yes" ? this.updateAssessment(this.yesVals) : null;
	this.value == "No"  ? this.handleNo(this.noVals)  : null;
	this.value == "N/A" ? this.updateAssessment(this.naVals)  : null;
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
		console.log("fire");
		this.apollo.watchQuery({
		query: questionQuery,
		fetchPolicy: "network-only",
		variables: {
			assessmentId: this.assessmentId,
			questionId
		}
		}).valueChanges
		  .subscribe(a => this.test = a);

	}

	checkLocalQuestion(id) {
		return this.current[id];
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

	getInputsFromLocal() {
		
	}

async	handlePreviousPageClick() {
		await this.surveyJS.prevPage();
		var { currentPageNo, pages } = this.surveyJS;
		this.questionId = this.current[currentPageNo].questionId;
		this.checkNextQuestion(currentPageNo);
		// this.resetSelect();
	}

	loadQuestion(array)	 {
		var notAnswered = array.filter(a => !a.currentAnswer )
		var sorted = notAnswered.sort((a,b) => a.questionId - b.questionId)	
		return sorted
	}

  // this function takes questions as assessment sub-documents and formats them
	// to be in the surveyJs format.
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

	createSurvey(assessment) {
		var filteredQuestions = this.filterByMRL(assessment);
		var current           = this.loadQuestion(filteredQuestions);
		this.current = current;
		var pages             = this.mapToSurveyJS(current);

		return {
				showNavigationButtons: false,
				showQuestionNumbers: "off",
				pages 	
		};
	}

	// What data do we actually need to store in instance vars?
  ngOnInit() {
		this.assessmentSubscription = this.apollo.watchQuery<any>({
			query: assessmentQuery,
			variables: {_id: this.assessmentId}
		})
			.valueChanges
			.subscribe( ({data, loading}) => {  
			console.log(data);
				var survey = this.createSurvey(data.assessment);
				this.currentMRL = data.assessment.currentMRL;
				this.levelSwitching = data.assessment.levelSwitching;
				// this.files = data.assessment.files;
  			this.surveyJS = new Survey.Model( survey );
  			Survey.SurveyNG.render("surveyElement", { model: this.surveyJS });
				// TODO clean this////////////////////////////////
				var { currentPageNo, pages } = this.surveyJS;
				pages[currentPageNo] ? this.mainTitle = pages[currentPageNo].name : null
				pages[currentPageNo] ? this.subTitle = pages[currentPageNo].elements[0].name : console.log(pages)
				// this.questionIds = current.map(a => a.questionId);
				this.questionId = this.current[currentPageNo].questionId;
				//////////// clean up above //////////////
		})

  }

  presentViewsPop(event){
    let popover = this.popoverController.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }
}

