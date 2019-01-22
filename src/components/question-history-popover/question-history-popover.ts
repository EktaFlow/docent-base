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



}
