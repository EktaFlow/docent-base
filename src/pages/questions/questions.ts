import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Survey from 'survey-angular';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
//import targetMRL1 from "json!../../assets/json/targetMRL1.json";

var assessmentQuery = gql`
`

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})


export class QuestionsPage {

	assessmentId: any;
	assessmentSubscription: any;
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
      }
    ]
  }  
  
  public value;
  public mainTitle;
  public subTitle;

  surveyJS = new Survey.Model( this.survey );

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name
    this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name

		console.log(navParams.data.data);
		this.assessmentId = navParams.data.data;
  }

  surveyChange(){
    this.value = this.surveyJS.getValue(this.survey.pages[this.surveyJS.currentPageNo].elements[0].name);
    this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name
    this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name
  }

  surveyValueChanged = function (sender, options) {
    console.log("hek")
    var el = (<HTMLInputElement>document.getElementById(options.name));
    if (el) {
        el.value = options.value;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    alert(resultAsString); //send Ajax request to your web server.
  }

	getAssessment() {
		
}

  ngOnInit() {
		this.assessmentSubscription = this.apollo.watchQuery<any>({
			query: assessmentQuery
		})
			.valueChanges
			.subscribe(({data, loading}) => console.log(data))

    this.surveyJS.onComplete.add(this.sendDataToServer);{
			query: assessmentQuery
		}
    Survey.SurveyNG.render("surveyElement", {model:this.surveyJS});
  }
}

