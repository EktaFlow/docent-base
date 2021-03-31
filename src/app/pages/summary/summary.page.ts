import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { LegendPopoverComponent } from '../../components/legend-popover/legend-popover.component';
import { QuestionsPage } from "../../pages/questions/questions.page";
import { ReportInfoCardComponent } from "../../components/report-info-card/report-info-card.component";
import { ActivatedRoute} from "@angular/router"
import { GoogleAnalytics } from '../../services/helpers/GoogleAnalytics';
import {isElectron} from "../../services/constants";

import * as XLSX from 'xlsx';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
                deskbookVersion
                name
		# id
		teamMembers {
      name
      email
      role
    }
	        targetMRL
	        targetDate
	        location
                scope
        	questions {
        		mrLevel
        		questionText
        		threadName
        		subThreadName
        		currentAnswer
        		questionId
                        answers {
	        	                likelihood
                            consequence
                            answer
                        }
    	        }
	}
}
`
@Component({
  selector: 'summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
	assessmentId: any;
	allQuestions: any;
        targetMRL: any;
        targetDate: any;
        location: any;
        team: any;
        survey: any;
        surveyResults: any;
        reviewResults = [];
        response;
        scope: any;
        questionSet: any;
        threads = {};
        threadsArr = [];
	      pageName: any = "MRL Risk Summary";
        bgColor = "green";
        schema: any;
        nonLevelSchema: any;
				filterList: any = {};
				unfilteredQuestions: any;
				autoFilter = true;
				filteredSchema: any;
        noExtraQuestions: boolean;
        isElectron: any;
        inAssessment: any;


	ionViewWillEnter() {
            GoogleAnalytics.trackPage("MRLSummary");
  }


	constructor( private apollo: Apollo,
	             public popOver: PopoverController,
	            private activatedRoute: ActivatedRoute) {
	               this.assessmentId = this.activatedRoute.snapshot.paramMap.get('assessmentId');
								 // this.autoFilter = this.activatedRoute.snapshot.paramMap.get('autoFilter');;
	}


	ngOnInit() {
    this.isElectron = isElectron;

    if (!this.isElectron){
			this.apollo.watchQuery({
				query: assessmentQuery,
				variables: {_id: this.assessmentId},
				fetchPolicy: "network-only"
				}).valueChanges
				.subscribe(data => {
          this.setPageVariables((<any>data.data).assessment)
				});
    } else {
      var myStorage = window.localStorage;
			if (myStorage.getItem('inAssessment') == 'true'){
        this.inAssessment = true;
				var fullAssessment = myStorage.getItem('currentAssessment');
				this.setPageVariables(JSON.parse(fullAssessment));
			}
    }

	}

  setPageVariables(assessment){
    var assessment = assessment;
    var questions = assessment.questions;
    this.allQuestions = assessment.questions;
        questions = questions.filter(q => q.threadName.length > 1);
        this.targetMRL = assessment.targetMRL;

    var mainQuestions = questions.filter(q => q.mrLevel == this.targetMRL);

    var extraQuestions = questions.filter(q => q.answers.length > 0);
    for (let question of extraQuestions){
    question = question.answers.filter(a => a.answer == null);
    }
    extraQuestions = extraQuestions.filter(q => q.mrLevel != assessment.targetMRL);

    this.schema = this.grabRiskScores(this.unfilteredQuestions);
		this.filteredSchema = this.grabRiskScores(this.unfilteredQuestions);
    console.log(this.schema);
		if (this.autoFilter){
			this.filterList.filterMRL = this.targetMRL;
			this.filterList.filterTitle = this.targetMRL;
			this.filterTheList();
		}


    this.schema = this.grabRiskScores(mainQuestions);
    console.log(this.schema);

    this.noExtraQuestions = true;

		// });
	}
	filterTheList() {

		if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
			var filteredQuestions = this.unfilteredQuestions.filter(question => question.mrLevel == this.filterList.filterMRL);
			this.filteredSchema = this.grabRiskScores(filteredQuestions);
			this.filterList.filterTitle = this.filterList.filterMRL;
		} else {
			this.filteredSchema = this.grabRiskScores(this.unfilteredQuestions);
			this.filterList.filterTitle = '';
		}

	}

	clearFilter() {
			this.filterList.filterMRL = 0;
			this.filterTheList();
			this.filterList.filterTitle = '';
	}

  unique = (item, index, array) => array.indexOf(item) == index
  filterUnique = (array, property=null) => property ? this.filterByProperty(array, property) : this.filterByValue(array)

	filterByValue(array) {
		return Array.from(new Set(array));
	}

	filterByProperty(array, itemProperty) {
		return Array.from(new Set(array.map(item => item[itemProperty])));
	}


  grabRiskScores(questionsObj){
      //create threads object with all the right data
      //also use arrays because that is how .html file can iterate
      var threads = {};
      var threadsArr = [];
      var schema = this.createThreadsObject(questionsObj);
      for (let question of questionsObj){
        //only need latest answer
        var answer = question.answers[question.answers.length - 1];
        var tIndex = schema.findIndex(function(obj){return obj.header == question.threadName});
        var sTIndex = schema[tIndex].subheaders.findIndex(function(obj){return obj.subThreadName == question.subThreadName});
        if (answer != undefined){
          if (answer.likelihood != undefined && answer.consequence != undefined){
            var score = this.calculateRiskScore(answer.likelihood, answer.consequence);
            schema[tIndex].subheaders[sTIndex].riskScores.push(score);
          }
        } else {
          schema[tIndex].subheaders[sTIndex].riskScores.push("");
        }
      }

      console.log(schema);
      return schema;

  }

  createThreadsObject(questionsObj){
    var threadNames = questionsObj.map(a => a.threadName)
                                     .filter(this.unique);


    var subThreadNames = threadNames.map( a => {
     var allSubheaders = questionsObj.filter(b => b.threadName == a)
     var subThreadNames = this.filterUnique(allSubheaders, "subThreadName")
       .map(s => {
         var riskScores = [];
         var questions = questionsObj.filter(m => m.subThreadName == s);
         var obj =  { subThreadName: s, riskScores: [], mrl: questions[0].mrLevel};
         return obj;
       })
     var obj2 =  {header: a, subheaders: subThreadNames };
     return obj2;
   });

   return subThreadNames;

  }

  extraFields(length){
    var extras = 5 - length;
    // console.log(Array(extras));
    return Array(extras);
  }

  setRiskColor(score){
    if (score == ""){
      return "white"
    } else if (score <= 11){
      return "green"
    } else if (score <= 19){
      return "yellow"
    } else if (score <= 25){
      return "red"
    } else {
      return "white"
    }
  }


saveXLS(){
  var headers = [
		"MRL",
    "Thread Name",
    "Subthread Name",
    "Criteria 1",
    "Criteria 2",
    "Criteria 3",
    "Criteria 4",
    "Criteria 5"
  ]

  var values = this.settingValues(this.filteredSchema)

  var newVals = []
  for (let arr of values) {
    if (arr.length > 1) {
      for (let arr2 of arr){
        newVals.push(arr2);
      }
    } else {
        newVals.push(arr[0]);
    }
  }


  var worksheet = [headers, ...newVals];

  var ws = XLSX.utils.aoa_to_sheet(worksheet);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'MRL Risk Summary');

  /* save to file */
  XLSX.writeFile(wb, 'mrl_risk_summary.xlsx');
  }

  settingValues(currentSchema){
    return currentSchema.map(thread => {
      var threads = [];
      for (var i =0; i < thread.subheaders.length; i++){
          threads.push([
            thread.header,
            thread.subheaders[i].subThreadName,
            ...thread.subheaders[i].riskScores
          ]);
        }
          return [...threads]
    });
  }

  public calculateRiskScore(likelihood, consequence) {
    // preventing off by one errors, with nulls.
    // values should always be 1-5
    var riskMatrix = [
      [ null ],
      [ null, 1, 3,  5,  8,  12],
      [ null, 2, 7,  11, 14, 17],
      [ null, 4, 10, 15, 19, 21],
      [ null, 6, 12, 18, 22, 24],
      [ null, 9, 16, 20, 23, 25]
    ];


    if ( likelihood && consequence ) {
      // value is the same as the index, b/c we put nulls in the matrix
      var likelihoodIndex  = Number(likelihood);
      var consequenceIndex = Number(consequence);

      // var name = selectedBox.className.replace(/ selected/g, '')
      // selectedBox.className = `${name} selected`;

      return riskMatrix[likelihoodIndex][consequenceIndex];
    } else {
      return "";
    }
  }

    public getRiskColor(score) {
        if (score<=0) {
            return "white";
        } else if (score <= 11) {
            return "lightgreen";
        } else if (score <= 20) {
            return "yellow";
        } else if (score <= 25) {
            return "#F75D59";
        } else {
            return "white";
        }
    }



}
