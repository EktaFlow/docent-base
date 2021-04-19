import { NgModule, Component, OnInit, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AssessmentService } from "../../services/assessment.service";
import { AuthService } from "../../services/auth.service";
import {FileUploadPopoverComponent} from "../../components/file-upload-popover/file-upload-popover.component";
import { FileDeleteComponent } from '../../components/file-delete/file-delete.component';
import { RiskPopoverComponent } from '../../components/risk-popover/risk-popover.component';

import { ActivatedRoute } from "@angular/router"
import { GoogleAnalytics } from '../../services/helpers/GoogleAnalytics';
import { Helpers } from '../../services/helpers/helpers';


@NgModule()
@Component({
  selector: 'questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
	public vals: any = {};
	assessmentId: any;
	public assessment: any;
	public helpClicked: boolean = false;
	public questionId: any;
	files = [];
	public allQuestions;
	public referringQuestionId: any;
	public targetMRL;
	public currentTargetMRL: any;
	public currentQuestion: any = {};
	public surveyQuestions;
	currentQSet: any;
	currentQSetAmt: any;
	currentQPos: any;
  public getAssessmentId = true;
	noSecondBar: boolean = true;

	constructor(public help: Helpers,
              private storage: Storage,
							public popOver: PopoverController,
						  private assessmentService: AssessmentService,
							private auth: AuthService,
              private activatedRoute: ActivatedRoute) {

		// QUESTION - SAVE THIS IN LOCAL MEMORY?
		this.referringQuestionId = activatedRoute.snapshot.paramMap.get('questionId');
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

		// if we don't already have a loaded assessment.
		var currentAssessment = await this.assessmentService
														 .getQuestionPageAssessment(this.assessmentId)

			currentAssessment.subscribe( ({data, loading}) => {
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
        // call this setLatestAnswer
				this.pullLatestAnswer(this.currentQuestion);
				this.findAmtOfQs();
		this.vals.when = this.formatDate();
		})
  }


  // @return - an array of ints
	setSurveyQuestions() {


    var threadNames = this.assessment.questions
    threadNames = threadNames.map( tn => tn.threadName);
    var distinctThreadNames = threadNames.filter((a, i) => threadNames[i + 1] != a && a.length > 0);

  var selectedThreads = this.assessment.threads.map( threadNumber => distinctThreadNames[threadNumber - 1] )

		var level1 = this.allQuestions.filter( q => q.mrLevel == this.assessment.targetMRL );
			var level2 = level1.filter( q => selectedThreads.includes(q.threadName))
			var level3 = 				level2.map( q => q.questionId);


			return level3;
	}

	determineCurrentQuestion() {
		var { getQuestion } = this;

		//what im trying to go in this if statement (mostly the else section)
		//1st filter out all nulls out of the answers array for each question
		//is that better to do outside of the find function? and then run find on the new array of questions?
		//run the find - the nulls would have been removed so they will not affect the length of the
		//answers array
		//we just really need to remove the nulls all together!

		if (this.referringQuestionId ) {
			this.currentQuestion = getQuestion(this.referringQuestionId);
		}
		else {
	  // var noNulls = this.surveyQuestions.map(q => q)
			var noAnswer = this.surveyQuestions.find( qId => {
				return getQuestion(qId).answers.length == 0;
			})
			if (noAnswer){
				this.currentQuestion = getQuestion(noAnswer);
			}else{
				let latestQuestion = this.surveyQuestions[this.surveyQuestions.length-1]
				this.currentQuestion = getQuestion(latestQuestion);
			}
		}
	}

	////////////////// CLICK HANDLERS //////////////////////////////////
	/////////////////////////// popover creator(s) /////////////////////
	async showFileUpload() {
			let myEmitter = new EventEmitter<any>();
			myEmitter.subscribe( v =>  {
			var files = JSON.parse(JSON.stringify(this.files));
			files.push(v)
			this.files = files;
			});
      const fileUpload = await this.popOver.create({
        component: FileUploadPopoverComponent,
        componentProps: {
          emitter: myEmitter,
          questionId: this.currentQuestion.questionId,
          assessmentId: this.assessmentId
        },
        cssClass: "upload-popover"
      });
      return await fileUpload.present();
	}

  async showRiskPopover(highlight) {
      var pop = await this.popOver.create({
        component: RiskPopoverComponent,
        componentProps: {
          highlight: highlight
        },
        cssClass: "risk-popover"
      });
      return await pop.present();
  }

  /**
  * on clicking the minus button next to a file.
  * - create emitter to pass data up from popover
  * - launch FileDelete popover, ask user to verify delete
  * - delete happens on FileDelete / or doesn't
  * - update DOM, assessment Object if file deleted
  */
  async handleRemoveFileClick(event, fileId) {
    var removeFileEmitter = new EventEmitter();
    removeFileEmitter.subscribe( event => {
      // remove the file from the view after its been deleted from db
      var files = JSON.parse(JSON.stringify(this.files));
      files = files.filter( file => file.id != fileId );
      this.files = files;
    });

    var fileDeleteData = {
      emitter:      removeFileEmitter,
      typeToDelete: 'file',
      assessmentId: this.assessmentId,
      fileId:       fileId
    }
    var pop = await this.popOver.create({
      component: FileDeleteComponent,
      componentProps: {
        emitter: removeFileEmitter,
        typeToDelete: 'file',
        assessmentId: this.assessmentId,
        fileId: fileId
      }
    });
    return await pop.present();

  }

  /**
  *  Simple handler to launch files in new tab/window rather than
  *  changing actual address url.
  */
  openFile(url) {
    window.open(url);
  }

	///////////////////////// next / prev / etc /////////////////////////////
	async handleNextPageClick() {
		// if (this.currentQPos == this.currentQSetAmt) return null;
		this.setValues();
		if ( this.assessment.levelSwitching ) { this.handleLevelSwitching() }
		else { this.moveCurrentQuestion(1) }
		this.vals = this.currentQuestion;
    // this can replace the line above
		this.pullLatestAnswer(this.currentQuestion);
		this.vals.when = this.formatDate();
		this.findAmtOfQs();
	}

	async	handlePreviousPageClick() {
		if ( this.currentQPos == 1 ) return null;
		this.setValues();
		this.moveCurrentQuestion(-1);
		this.vals = this.currentQuestion;
    // this can replace the line above
		this.pullLatestAnswer(this.currentQuestion);
		this.vals.when = this.formatDate();
		this.findAmtOfQs();
	}

	async handleOnFinishedClick() {
		this.setValues();
		alert("You have finished the assesment")
	}

  handleSave() {
		this.setValues();
		alert("This question has been saved");
	}

	/////////////////////////////////////////////////////////////////////////
	///////////// FUNCTIONS DEALING WITH VALUE SETTING /////////////////////

	///// any modification of the inputs needed to be used in the assessment
	///// update function
	setValues() {
    if ( this.valuesHaveChanged() ) {
    // if nothing has been changed -- dont do any of this.
		  var values: any = Object.assign({}, this.vals)
		  values = this.filterAnswerVals(values);


      this.updateAssessment(values);
    }
	}

  // this is used to pass to the template
	getQuestionValues() {
		var values: any = Object.assign({}, this.vals)
		values = this.filterAnswerVals(values);

		return values
	}

	// refactor this down
  // values is an object containing the latest values from the input.
  // if there are no changes, we don't want to do anything.
	async updateAssessment(values) {
		var nice = this.currentQuestion.questionId;

		//updating object in memory
		var oldAssessment = this.allQuestions.map( q => Object.assign({}, q));
		var newerQuestion = oldAssessment[this.currentQuestion.questionId - 1];

		var currentUser = this.auth.currentUser();
		values.userId = currentUser._id;
		values.updatedAt = new Date();
    // we're setting this earlier.
    //values.answer = values.currentAnswer;
		newerQuestion.currentAnswer = values.answer;
		delete values.currentAnswer

		var updatedAnswers = [...newerQuestion.answers, values];
		newerQuestion.answers = updatedAnswers;

		var tempAssessmentObject = JSON.parse(JSON.stringify(this.allQuestions));
		tempAssessmentObject.splice(this.currentQuestion.questionId - 1, 1, newerQuestion);
    this.allQuestions = tempAssessmentObject;
    this.currentQuestion = this.allQuestions.filter(q => q.questionId == this.currentQuestion.questionId)[0];

		// ---------------------------------------------------------

		//updating object in the back
		// if
		var hasOfflineAnswers = await this.storage.get('offline');
		// if it has offline answers...
		if ( hasOfflineAnswers ) {
				var saveOffline = await this.assessmentService.updateQuestionSeries(hasOfflineAnswers);
				if ( saveOffline ) {
					this.storage.remove('offline')
					} else {
					}

			} else {
			}

		var tempQuestion = {
			"currentAnswer": newerQuestion.currentAnswer
		}

		var updatedInfo = {
			_id: this.assessmentId,
			questionId: nice,
			questionUpdates: tempQuestion,
			answerUpdates: values
		};
		var update = await this.assessmentService.updateQuestion(updatedInfo);
		update.subscribe(data => {
			// we're (almost?) always going to end up in here because we're catching the error in the service
      			// if the update is successful clear the offline object in Storage
			// what is the data object on failure and on success??
			// right now, we only want to handle the failure case -- no we want both because we want to store and / or delete.
			if ( (<any>data).data ) {
				// any successful gql response is going to have a key called 'data'
				this.storage.remove('offline')
					.then( p => {
						p ? console.log('something was removed') : console.log('nothing removed... nothing exist??')
					})

			}

			if ( (<any>data).error ) {
				var offlineAnswers = hasOfflineAnswers || [];
				offlineAnswers.push( updatedInfo );
				this.storage.set('offline', offlineAnswers);
			}
		});
	}

        /**
        *   @purpose: determine whether there have been any changes made
        *   @return: boolean
        *   checks the state of this.vals against current answer of this.currentQuestion
        */
        valuesHaveChanged() {
                var oldAnswer: any = {};
                var changed = false;
                if ( this.currentQuestion.answers.length > 0 ) {
                        oldAnswer = this.currentQuestion.answers[this.currentQuestion.answers.length - 1];
                }

                // we only want to compare based on inputs, neither of these are direct inputs
                delete this.vals.updatedAt;
                delete this.vals.userId;

                for (let value in this.vals) {
                  this.vals[value] != oldAnswer[value] ? changed = true : null
                }

                return changed;
        }

	moveCurrentQuestion(way) {
		var { questionId } = this.currentQuestion;

		if (!this.surveyQuestions.includes(this.currentQuestion.questionId)) {
			//alert("what is the order when a rando question gets added in?");
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
					let mrLevel = this.currentQuestion.mrLevel -1;
					alert(`You have failed this subthread, you will be shown questions from this subthread at the next lowest level ${mrLevel}`);
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
			level.every(ques => ["Yes", "Skipped", "skipped", "N/A"].includes(ques.currentAnswer) ) ? floor = true : null
		});

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

  // this function takes in the current question (as an object);
  // and sets this.vals to the latest answer (by timestamp)
	pullLatestAnswer(question){
		var answers = JSON.parse(JSON.stringify(question.answers));

    answers.sort( (a, b) => {
      var horridTypescriptCastingA = <any>(new Date(a.updatedAt));
      var horridTypescriptCastingB = <any>(new Date(b.updatedAt));

      // `Date - Date` is valid JS and returns a Number
      // there should be no need to do that casting.
      return horridTypescriptCastingB - horridTypescriptCastingA;
    });

		if(answers.length === 0) {
      this.vals = this.filterAnswerVals({});
		} else {
			this.vals = this.filterAnswerVals(answers[0]);
		}
	}

	// TODO: REMOVE - Replace with pullLatestAnswer
	//we will not need this anymore
	filterAnswerVals(answer) {

		var filteredFields:any = {};
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
			"riskResponse",
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

                answerVals.forEach(val => {
                        filteredFields[val] = answer[val] ? answer[val] : null
                });
		// filteredFields.when = this.formatDate();

		return <any>filteredFields;

	}

	public onHelpClicked(){
		this.helpClicked = !this.helpClicked;
	}

  public findAmtOfQs(){
		this.currentQSetAmt = this.surveyQuestions.length;
		this.currentQPos = this.surveyQuestions.indexOf(this.currentQuestion.questionId) + 1;

  }

  /**
  *  to display correctly on the `date` html5 `input` element, the object needs
  *  `YYYY-mm-dd` formatting, rather than the format from the db.
  */
  public formatDate() {
  	var date;
        this.currentQuestion.answers && this.currentQuestion.answers.length > 0 ? date = this.currentQuestion.answers[this.currentQuestion.answers.length - 1].when : null
	if (!date) {
		return null;
	} else {
		return new Date(date)
			     .toISOString()
			     .slice(0,10);
	}
  }

  private clearSelected() {
			var rows = (<any>document.querySelectorAll('.matrix-row th'));
              rows.length > 0 ? rows.forEach(element => { element.className = element.className.replace(/selected/g, ''); element.innerHTML = '';}) : null
  }

  public calculateRiskScore() {
    // preventing off by one errors, with nulls.
    // values should always be 1-5
    this.clearSelected();
    var riskMatrix = [
      [ null ],
      [ null, 1, 3,  5,  8,  12],
      [ null, 2, 7,  11, 14, 17],
      [ null, 4, 10, 15, 19, 21],
      [ null, 6, 12, 18, 22, 24],
      [ null, 9, 16, 20, 23, 25]
    ];

    // typescript -_-
    var likelihood = (<any>this.vals).likelihood;
    var consequence = (<any>this.vals).consequence;

    if ( likelihood && consequence ) {
    (<any>document.querySelectorAll('.matrix-row th')).forEach(element => { element.className = element.className.replace(/selected/g, ''); element.innerHTML = '';});

      // value is the same as the index, b/c we put nulls in the matrix
      var likelihoodIndex  = Number(likelihood);
      var consequenceIndex = Number(consequence);

      var selectedId = 'm' + String(likelihood) + String(consequence);
      var selectedBox = document.querySelectorAll("." + selectedId);
      var lordy = Array.from(selectedBox);
      lordy.forEach( a => {
      	var name = a.className.replace(/ selected/g, '')
      	a.className = `${name} selected`;
      	a.innerHTML = String(riskMatrix[likelihoodIndex][consequenceIndex]);
      })

      return riskMatrix[likelihoodIndex][consequenceIndex];
    } else {
      return " ";
    }
  }

  public launchLikelihood() {

  }


}
