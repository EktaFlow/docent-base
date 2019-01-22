import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuestionsPage } from '../../pages/questions/questions';
import { AssessmentService } from "../../services/assessment.service";
import {AuthService} from "../../services/auth.service";
import { AuthUrl } from "../../services/constants";



@Component({
  selector: 'question-history-popover',
  templateUrl: 'question-history-popover.html'
})
export class QuestionHistoryPopoverComponent {

  text: string;
  assessmentId: any;
  questionId: any;
  assessment: any;
  latestQuestion: any;
  noAnswers: boolean = false;
  allQuestions: any;
  answerToShow: any = null;
  answersSorted: any;
  emails: any;


  constructor( public navCtrl: NavController,
                      public navParams: 		 NavParams,
                      private assessmentService: AssessmentService,
                      private auth: AuthService
                  ) {

    this.assessmentId = navParams.data.assessmentId;
    this.questionId = navParams.data.questionId;
  }

  async ngOnInit(){
      var assessment = await this.assessmentService.getQuestionPageAssessment(this.assessmentId)
      assessment.subscribe(({data, loading}) => {
        var allQuestions = data.assessment.questions;
        this.latestQuestion = allQuestions.filter(q => q.questionId == this.questionId);
        this.latestQuestion = this.latestQuestion[0];
        this.decideAnswersAction(this.latestQuestion);
        console.log(this.answersSorted)
        this.getUserIds(this.answersSorted);
      });



  }

  // async fetchUser(id){
  //   var userObject = await this.auth.fetchUser(id);
  //   userObject.subscribe(a => console.log(a) );
  // }

  async getUserIds(answers){
    var ids = [];
    for (let answer of answers){
      ids.push(answer.userId);
      ids.push(answer.revertedBy);
    }

    ids = ids.filter(this.onlyUnique);

    var userInfo = {
			"ids": ids
		}


    // var emails = await this.auth.fetchMultiple(ids);
    // console.log(emails);
    // emails.subscribe(a => console.log("please log"));

    // user = this.auth.currentUser();
    console.log(userInfo)
     await fetch(AuthUrl + "fetchMultiple", {
     method: "POST",
     body: JSON.stringify(userInfo),
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
   })
     .then(a => a.json())
     .then(a => this.emails = a)
     .catch(e => console.log(e));






  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

  decideAnswersAction(question){
    if (question.answers.length >= 2){
      this.noAnswers = true;
      this.answersSorted = this.sortAnswers(question);
    } else if (question.answers.length == 1){
      this.noAnswers = true;
      this.answersSorted = question.answers;
    } else {
      this.noAnswers = false;
    }
  }


    sortAnswers(question){
      var answers = JSON.parse(JSON.stringify(question.answers));
      answers.sort((a, b) => {
        var dateA = new Date(a.updatedAt);
        var dateB = new Date(b.updatedAt);
        return dateB.getTime() - dateA.getTime();
      });
      if(answers == []){
        return null;
      } else {
        return answers;
      }
    }

    toggleAnswer(answerId){
      if (this.answerToShow == answerId) {
        this.answerToShow = null;
      } else {
        this.answerToShow = answerId;
      }
    }

    async revertBack(newAnswer){
      // var currentAnswer = this.latestQuestion.answers[0];
      //we have latestQuestion, currentAnswer and newAnswer
      //probably do not need currentAnswer unless we want to check reverting back to currentAnswer
      //we could allow but do we need to?
      //just call updateAssessment  and make sure updateInfo is sending correctly
      //below is a function from the questions page - this is what gets called to send the correct info
      //and then you can call
      //this.assessmentService.updateQuestion(updateInfo);
      //so we just need to make sure the values are getting filtered correctly so we dont send anything
      //we dont need to the back and then call line 91 - pretty easy
      var tempQuestion = {
  			"currentAnswer": newAnswer.answer
  		}

      var filteredAnswer = this.filterAnswerVals(newAnswer);
      // filteredAnswer.userId = await this.auth.currentUser().id;
      filteredAnswer.updatedAt = new Date();
      filteredAnswer.revertedBy = await this.auth.currentUser().id;
      console.log(filteredAnswer);
      console.log(this.latestQuestion);
      var updateInfo = {
        _id: this.assessmentId,
        questionId: Number(this.latestQuestion.questionId),
        answerUpdates: filteredAnswer,
        questionUpdates: tempQuestion
      }
      console.log(updateInfo);

      var update = await this.assessmentService.updateQuestion(updateInfo);
  		update.subscribe(data => this.navCtrl.push(QuestionsPage, {
  			assessmentId: 			this.assessmentId,
  			questionId: this.latestQuestion.questionId
  		}));


    }

    // getQuestionValues() {
  	// 	var values: any = Object.assign({}, this.vals)
  	// 	values.currentAnswer === null ? values.currentAnswer = "skipped" : null
  	// 	values = this.filterAnswerVals(values);
    //
  	// 	return values
  	// }

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
  			"notesNA"
  		];

                  answerVals.forEach(val => {
                          filteredFields[val] = answer[val] ? answer[val] : null
                  });
  		// filteredFields.when = this.formatDate();

  		return <any>filteredFields;

  	}



}
