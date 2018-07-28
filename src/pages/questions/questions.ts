import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import * as Survey from 'survey-angular';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import {FileUploadPopoverComponent} from "../../components/file-upload-popover/file-upload-popover";

var assessmentQuery = gql`
query assessment($_id: String) 
{
 assessment(_id: $_id)  {
	questions{
		questionId
    threadName
    subThreadName
    mrLevel
		questionId
		questionText
  }
  targetMRL
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
	private questionIds: []; 
	private questionId: any; //= this.questionIds[this.surrveyJS.currentPageNo]


	constructor(public navCtrl: NavController, public navParams: NavParams, 
							private popoverController: PopoverController, private apollo: Apollo) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY? 
		this.assessmentId = navParams.data.data;
  }

	showFileUpload(event) {
	var fileUploadPopover = this.popoverController.create(FileUploadPopoverComponent, { questionId: this.questionId});
		fileUploadPopover.present({ ev: event });
	}

  surveyChange(){
		console.log("hmm?");
		// values needs to stay here because it's tied to the conditional rendering.
    // if undefined, skipped
		if (this.surveyJS) {
			var {pages, currentPageNo} = this.surveyJS;
			// TODO - clean this up below
			this.value = this.surveyJS.getValue(pages[currentPageNo].elements[0].name)

			this.mainTitle = pages[currentPageNo].name
			this.subTitle = pages[currentPageNo].elements[0].name
		}
  }

	resetSelect() {
		setTimeout( () => {
			document.querySelector(".sv_q_dropdown_control")
							.firstChild
							.selected = true; 
			this.value = undefined;
		}, 200);
	}

	updateAssessment(values) {
		this.apollo.mutate({
			mutation: updateAssessmentQuery,
			variables: {
				_id:				this.assessmentId,
				questionId: Number(this.questionId),
				updates:		values
			}
		}).subscribe(data => console.log(data));
	}
	
	getQuestionId() {
		console.log(this.surveyJS.currentPageNo);
	}

	setValues() {
	this.value == "Yes" ? this.updateAssessment(this.yesVals) : null
	this.value == "No"  ? this.updateAssessment(this.noVals)  : null;
	this.value == "N/A" ? this.updateAssessment(this.naVals)  : null;
}

	handleNextPageClick() {
		console.log(this.questionIds);
		this.setValues();
		this.surveyJS.nextPage();
		this.resetSelect();
		// update the questionId!!
	}

	loadQuestion(array)	 {
		var notAnswered = array.filter(a => !a.answered)
		var sorted = array.sort((a,b) => a.questionId - b.questionId)	
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
		console.log(assessmentQuery)
		console.log(this.assessmentId)
		this.assessmentSubscription = this.apollo.watchQuery<any>({
			query: assessmentQuery,
			variables: {_id: this.assessmentId}
		})
			.valueChanges
			.subscribe( ({data, loading}) => {  
				var survey = this.createSurvey(data.assessment);
  			this.surveyJS = new Survey.Model( survey );
  			Survey.SurveyNG.render("surveyElement", { model: this.surveyJS });
				// TODO clean this////////////////////////////////
				var { currentPageNo, pages } = this.surveyJS;
				this.mainTitle = pages[currentPageNo].name
				this.subTitle = pages[currentPageNo].elements[0].name
				// this.questionIds = current.map(a => a.questionId);
				this.questionId = this.current[currentPageNo].questionId;
				console.log(this.current[currentPageNo]);
				//////////// clean up above //////////////
		})

  }
}

