import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavParams, PopoverController } from 'ionic-angular';
import { ReviewPage } from '../review/review';
import { ViewsComponent } from '../../components/views/views';
import { AssessmentService } from "../../services/assessment.service";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { AuthService } from "../../services/auth.service";

import {FileUploadPopoverComponent} from "../../components/file-upload-popover/file-upload-popover";

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})

export class QuestionsPage {

	private vals = {};
	assessmentId: any;
	private assessment: any;
	public helpClicked: boolean = false;
	private questionId: any;
	files = [];
	private allQuestions;
	private referringQuestionId: any;
	private targetMRL;
	private currentTargetMRL: any;
	private currentQuestion: any = {};
	private surveyQuestions;
	currentQSet: any;
	currentQSetAmt: any;
	currentQPos: any;
  public getAssessmentId = true;
	noSecondBar: boolean = true;

	constructor(public navParams:          NavParams,
							private popoverController: PopoverController,
						  private assessmentService: AssessmentService,
							private auth: AuthService) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY?
		this.referringQuestionId = navParams.data.questionId;
  }

	ionViewWillEnter() {
    GoogleAnalytics.trackPage("questions");
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
  async ngOnInit() {
		this.assessmentId = await this.assessmentService.getCurrentAssessmentId();
    console.log(this.assessmentId);

		// if we don't already have a loaded assessment.
		var currentAssessment = await this.assessmentService
														 .getQuestionPageAssessment(this.assessmentId)

			currentAssessment.subscribe( ({data, loading}) => {
				console.log(data.assessment);
				this.assessment = data.assessment;
        this.files = data.assessment.files;
				var {assessment} = this;
				this.allQuestions = assessment.questions;
				this.targetMRL = assessment.targetMRL;
				this.currentTargetMRL = assessment.targetMRL;
				this.surveyQuestions = this.setSurveyQuestions();
				// add if no currentQuestionId
				this.determineCurrentQuestion();

				//pullLatestAnswer
				//if there is no latestAnswer then return empty object
				//put in latestAnswer into this.filterAnswerVals()
				var latestAnswer = this.pullLatestAnswer(this.currentQuestion);
				console.log(latestAnswer);
				if (latestAnswer == null){
					this.vals = this.filterAnswerVals({});
				} else {
					this.vals = this.filterAnswerVals(latestAnswer);
				}
				this.findAmtOfQs();
		})
  }

	setSurveyQuestions() {
    return this.allQuestions.filter( q => q.mrLevel == this.assessment.targetMRL )
							.map( q => q.questionId);
	}

	determineCurrentQuestion() {
		var { getQuestion } = this;

		if (this.referringQuestionId ) {
			this.currentQuestion = getQuestion(this.referringQuestionId);
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
			var files = JSON.parse(JSON.stringify(this.files));
			files.push(v)
			this.files = files;
			});

			this.popoverController.create(FileUploadPopoverComponent,
					{
						emitter: myEmitter,
						questionId: this.currentQuestion.questionId,
						assessmentId: this.assessmentId
					},
					{	cssClass: "upload-popover"})
				.present();
	}

	///////////////////////// next / prev / etc /////////////////////////////
	async handleNextPageClick() {
		this.setValues();
		if ( this.assessment.levelSwitching ) { this.handleLevelSwitching() }
		else { this.moveCurrentQuestion(1) }
		this.vals = this.currentQuestion;
		this.findAmtOfQs();
	}

	async	handlePreviousPageClick() {
		if ( this.currentQPos == 1 ) return null;
		this.setValues();
		this.moveCurrentQuestion(-1);
		this.vals = this.currentQuestion;
		this.findAmtOfQs();
		console.log(this.vals.reason);
		
	}

	/////////////////////////////////////////////////////////////////////////
	///////////// FUNCTIONS DEALING WITH VALUE SETTING /////////////////////

	///// any modification of the inputs needed to be used in the assessment
	///// update function
	setValues() {
		var values: any = Object.assign({}, this.vals)
		values.currentAnswer === null ? values.currentAnswer = "skipped" : null
		values = this.filterAnswerVals(values);

		this.updateAssessment(values);
	}

	// sendUpdateInfo(){
	// 	var values = getQuestionValues();
	// 	var updateInfo = {
	// 		_id: this.assessmentId,
	// 		questionId: this.currentQuestionId,
	// 		updates: values
	// 	}
	//
	// 	return updateInfo;
	// }

	getQuestionValues() {
		var values: any = Object.assign({}, this.vals)
		values.currentAnswer === null ? values.currentAnswer = "skipped" : null
		values = this.filterAnswerVals(values);

		return values
	}

	// refactor this down
	async updateAssessment(values) {

		//updating object in memory

		var oldQuestion = this.allQuestions.find(a => a.questionId == this.currentQuestion.questionId);
		var oldAssessment = this.allQuestions.map( q => Object.assign({}, q));
		var newerQuestion = oldAssessment[this.currentQuestion.questionId - 1];

		// console.log(values);
		var currentUser = this.auth.currentUser();
		// console.log(currentUser);
		values.userId = currentUser._id;
		values.updatedAt = new Date();
		values.answer = values.currentAnswer;
		newerQuestion.currentAnswer = values.currentAnswer;
		delete values.currentAnswer

		var updatedAnswers = [...newerQuestion.answers, values];
		newerQuestion.answers = updatedAnswers;
		// console.log(newerQuestion);

		var tempAssessmentObject = JSON.parse(JSON.stringify(this.allQuestions));
		tempAssessmentObject.splice(this.currentQuestion.questionId - 1, 1, newerQuestion);
		this.allQuestions = tempAssessmentObject;

		// ---------------------------------------------------------

		//updating object in the back

		var tempQuestion = {
			"currentAnswer": newerQuestion.currentAnswer
		}

		var updatedInfo = {
			_id: this.assessmentId,
			questionId: Number(this.currentQuestion.questionId),
			questionUpdates: tempQuestion,
			answerUpdates: values
		};
		console.log(updatedInfo);
		var update = await this.assessmentService.updateQuestion(updatedInfo);
		update.subscribe(data => null);
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

											 // add logic if there is no lower mrLevel
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
	// mapToSurveyJS(questions) {
	// 	return questions.map( question => {
	// 		return {
	// 			name: question.threadName,
	// 			elements: [{
	// 				type: "dropdown",
	// 				name: question.subThreadName,
	// 				title: question.questionText,
	// 				choices: [
	// 					"Yes",
	// 					"No",
	// 					"N/A"
	// 				]
	// 			}]
	// 		};
	// 	});
	// }

	pullLatestAnswer(question){
		console.log(question);
		var answers = question.answers;
		answers.sort((a, b) => {
			console.log(b.updatedAt);
			b.updatedAt - a.updatedAt
		});
		if(answers == []){
			return null;
		} else {
			return answers[0];
		}
	}

	// TODO: REMOVE - Replace with pullLatestAnswer
	//we will not need this anymore
	filterAnswerVals(answer) {
		// better way to do this.
		var filteredFields = {};
		var answerVals = [
			"userId",
			"updatedAt",
			"answer",
			"objectiveEvidence",
			"assumptionsYes",
			"notesYes",
			"notesSkipped",
			"assumptionsSkipped",
			"who",
			"when",
			"risk",
			"likelihood",
			"consequence",
			"greatestImpact",
			"riskReponse",
			"mmpSummary",
			// "technical",
			// "cost",
			// "schedule",
			"what",
			"reason",
			"assumptionsNo",
			"notesNo",
			"documentation",
			"assumptionsNA",
			"notesNA",
			"currentAnswer"
		];

		answerVals.forEach(val => filteredFields[val] = answer[val]);

		return <any>filteredFields;

	}

	public onHelpClicked(){
		this.helpClicked = !this.helpClicked;
	}

  public findAmtOfQs(){
		this.currentQSetAmt = this.surveyQuestions.length;
		this.currentQPos = this.surveyQuestions.indexOf(this.currentQuestion.questionId) + 1;

  }


}
