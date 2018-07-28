import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Survey from 'survey-angular';
import { ReviewPage } from '../review/review';
//import targetMRL1 from "json../../assets/json/targetMRL1.json";


/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})

export class QuestionsPage {

  survey = {
    "showNavigationButtons":false,
    "showQuestionNumbers":"off",
    "pages":[
      {
        "name":"Technology Maturity",
        "elements":[
          {
            "type":"dropdown",
            "name":"Technology Maturity",
            "title":"Is the Technology Readiness at TRL 1 or greater?",
            "choices":[
              "Yes",
              "No",
              "N/A",
            ]
          },
        ]
      },
      {
        "name":"Design",
        "elements":[
          {
            "type":"dropdown",
            "name":"Desing Maturity",
            "title":"Have manufacturing research opportunities been identified?",
            "choices":[
              "Yes",
              "No",
              "N/A",
            ]
          },
        ]
      },
      {
        "name":"Cost & Funding",
        "elements":[
          {
            "type":"dropdown",
            "name":"Cost Analysis",
            "title":"Have manufacturing cost implications been identified?",
            "choices":[
              "Yes",
              "No",
              "N/A",
            ]
          },
        ]
      },
      {
        "name":"Cost & Funding",
        "elements":[
          {
            "type":"dropdown",
            "name":"Manufacturing Investment Budget",
            "title":"Have potential investments been identified?",
            "choices":[
              "Yes",
              "No",
              "N/A",
            ]
          },
        ]
      },
      {
        "name":"Materials",
        "elements":[
          {
            "type":"dropdown",
            "name":"Maturity",
            "title":"Have material properties been identified for research?",
            "choices":[
              "Yes",
              "No",
              "N/A",
            ]
          },
        ]
      },
      {
        "name":"Materials",
        "elements":[
          {
            "type":"dropdown",
            "name":"Maturity ",
            "title":"Dumpster",
            "choices":[
              "Yes",
              "No",
              "N/A",
            ]
          },
        ]
      }
    ]
  } 

  public value;
  public mainTitle;
  public subTitle;
  public nextButton;

  targetMRL: any;
  date: any;
  location: any;

  actionPerson = [];

  currentQuestion = [];

  answers = [];

  surveyJS = new Survey.Model( this.survey );

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name
    this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name
    this.targetMRL = navParams.get('mrl');
    this.date = navParams.get('date');
    this.location = navParams.get('location')
  }

  addPerson(who){
    this.actionPerson.push(who);
  }

  removePerson(){
    this.actionPerson.pop();
  }

  complete(){
    var replace = false;
    for(var i = 0; i < this.answers.length; i+=1){
      if(this.answers[i].title == this.subTitle){
        this.answers[i].data = this.currentQuestion;
        replace = true;
      }
    }
    //If a replacement does NOT occur
    if(!replace){
      this.currentQuestion.push({title:this.survey.pages[this.surveyJS.currentPageNo].elements[0].title});
      this.answers.push({title:this.subTitle,data:this.currentQuestion});
    }

    this.currentQuestion = [];

    var resultAsString = JSON.stringify(this.surveyJS.data);
    console.log(resultAsString);
    console.log(this.answers);
  }
// assumptions = null, notes = null, objectiveEvidence = null, when = null, risk = null, what = null, reason = null, documentation = null
  surveyChange(){
    //This will get the values for th header
    this.value = this.surveyJS.getValue(this.survey.pages[this.surveyJS.currentPageNo].elements[0].name);
    this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name;
    this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name;
    //This will change the button functionality in the event someone wants to go back and change answers
    if(this.survey.pages.length-1 == this.surveyJS.currentPageNo){
      this.nextButton = "Complete";
    }
    else{
      this.nextButton = null;
    }
    //This is where data will be processed
  }

  log(type, val){
    //responses logged
    this.currentQuestion.push({type:type,answer:val});
  }

  next(){
    var replace = false;
    for(var i = 0; i < this.answers.length; i+=1){
      if(this.answers[i].title == this.subTitle){
        this.answers[i].data = this.currentQuestion;
        replace = true;
      }
    }
    //If a replacement does NOT occur
    if(!replace){
      this.currentQuestion.push({title:this.survey.pages[this.surveyJS.currentPageNo].elements[0].title});
      this.answers.push({title:this.subTitle,data:this.currentQuestion});
    }
    this.currentQuestion = [];
    this.surveyJS.nextPage();
  }

  prev(){
    this.surveyJS.prevPage()
  }

  sendDataToServer() {
    var resultAsString = JSON.stringify(this.surveyJS.data);
    alert(resultAsString); //send Ajax request to your web server.
  }

  ngOnInit() {
    this.surveyJS.onComplete.add(this.sendDataToServer);
    Survey.SurveyNG.render("surveyElement", {model:this.surveyJS});
  }
}
