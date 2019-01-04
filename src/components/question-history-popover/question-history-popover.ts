import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuestionsPage } from '../../pages/questions/questions';
import { AssessmentService } from "../../services/assessment.service";


@Component({
  selector: 'question-history-popover',
  templateUrl: 'question-history-popover.html'
})
export class QuestionHistoryPopoverComponent {

  text: string;
  assessmentId: any;
  questionId: any;
  assessment: any;
  currentQuestion: any;
  noAnswers: boolean = false;
  allQuestions: any;
  answersSorted: any;

  constructor( public navCtrl: NavController,
                      public navParams: 		 NavParams,
                      private assessmentService: AssessmentService
                  ) {

    this.assessmentId = navParams.data.assessmentId;
    this.questionId = navParams.data.questionId;
  }

  async ngOnInit(){
      var assessment = await this.assessmentService.getQuestionPageAssessment(this.assessmentId)
      assessment.subscribe(({data, loading}) => {
        this.allQuestions = data.assessment.questions;
        console.log(this.allQuestions);
        console.log(this.questionId);
        this.currentQuestion = this.allQuestions.filter(q => q.questionId == this.questionId);
        this.decideAnswersAction(this.currentQuestion[0]);
      });



  }

  decideAnswersAction(question){
    console.log(question);
    console.log(question.answers);
    if (question.answers.length >= 2){
      this.noAnswers = true;
      this.answersSorted = this.sortAnswers(question);
      console.log(this.answersSorted);
    } else if (question.answers.length == 1){
      this.noAnswers = true;
      this.answersSorted = question.answers;
    } else {
      this.noAnswers = false;
    }
  }


    sortAnswers(question){
      console.log(question);
      var answers = question.answers;
      answers.sort((a, b) => {
        console.log(b.updatedAt);
        b.updatedAt - a.updatedAt
      });
      if(answers == []){
        return null;
      } else {
        return answers;
      }
    }



}
