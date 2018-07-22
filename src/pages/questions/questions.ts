import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Survey from 'survey-angular';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) 
{
 assessment(_id: $_id)  {
	questions{
		questionId
    threadName
    subThread
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

	private questionId: any = this.questionIds[this.surrveyJS.currentPageNo]
	private questionIds: []; 


  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY? 
		this.assessmentId = navParams.data.data;
  }



  surveyChange(){
		console.log
		// TODO - refactor these for clarity.
		// values needs to stay here because it's tied to the conditional rendering.
    this.value = this.surveyJS.getValue(this.survey.pages[this.surveyJS.currentPageNo].elements[0].name);
		console.log(this.value);
    // if undefined, skipped
    this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name
    this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name
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
				_id: this.assessmentId,
				questionId: Number(this.questionId),
				updates: values
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

  sendDataToServer(survey) {
		console.log("data would be sent now");
    var resultAsString = JSON.stringify(survey.data);
    alert(resultAsString); //send Ajax request to your web server.
  }

	loadQuestion(array)	 {
		var notAnswered = array.filter(a => !a.answered)
		var sorted = array.sort((a,b) => a.questionId - b.questionId)	
		return sorted
	}

  ngOnInit() {
		console.log(this.assessmentId);
		this.assessmentSubscription = this.apollo.watchQuery<any>({
			query: assessmentQuery,
			variables: {_id: this.assessmentId}
		})
			.valueChanges
			.subscribe(({data, loading}) =>{  
				this.filtered = data.assessment.questions.filter(a => a.mrLevel == data.assessment.targetMRL)
				var current = this.loadQuestion(this.filtered);
			var pages = current.map(q => {
					return ({
						name: q.threadName,
						elements: [{
							type: "dropdown",
							name: "subthread name",
							title: q.questionText,
							choices: [
								"Yes",
								"No",
								"N/A"
							]
						}]
					});
				})
			console.log(pages);
  var survey = {
    "showNavigationButtons":false,
    "showQuestionNumbers":"off",
    "pages": pages 
		}  
				this.survey = survey;
  			this.surveyJS = new Survey.Model( survey );
  			Survey.SurveyNG.render("surveyElement", {model:this.surveyJS});
		// TODO - refactor for clarity.
    this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name
    this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name
		var { currentPageNo } = this.surveyJS;
		console.log(currentPageNo);
		this.questionIds = current.map(a => a.questionId);
		this.questionId = current[currentPageNo].questionId;
		})

    //this.surveyJS.onComplete.add(this.sendDataToServer);{
		//	query: assessmentQuery
		//}
  }
}

