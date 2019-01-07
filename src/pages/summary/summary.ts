import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { LegendPopoverComponent } from '../../components/legend-popover/legend-popover';
import { QuestionsPage } from "../questions/questions";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
                deskbookVersion
                name
		id
		teamMembers
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
                        }
    	        }
	}
}
`



@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

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
	pageName: any = "MRL Summary";
        bgColor = "green";



	ionViewWillEnter() {
            GoogleAnalytics.trackPage("MRLSummary");
        }




	constructor( private apollo: Apollo,
							 public navCtrl: NavController,
							 public navParams: NavParams,
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
  }

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
                            var assessment = (<any>data.data).assessment;
                            var questions = assessment.questions;
                   
                            console.log(assessment); 
                            //set top-level items
                            this.scope = assessment.scope;
                            this.team = assessment.teamMembers;
		            this.targetMRL = assessment.targetMRL;
		            this.targetDate = assessment.targetDate;
		            this.location = assessment.location;

                            //create threads object with all the right data
                            //also use arrays because that is how .html file can iterate 
                            var threads = {};
                            var threadsArr = [];


                           //create threads object with all the right data
                            //also use arrays because that is how .html file can iterate
                            var threads = {};
                            var threadsArr = [];
                            questions.forEach(q => {
                                if (threadsArr.indexOf(q.subThreadName) > -1) {
                                            var cur;
                                            q.answers.forEach (a => { cur = a; });
                                            if (typeof(cur) != "undefined") {
                                                var score = this.calculateRiskScore(cur.likelihood, cur.consequence); 
                                                if (!threads[q.subThreadName]["riskScores"][q.mrLevel]) {
                                                    threads[q.subThreadName]["riskScores"][q.mrLevel] = [];
                                                } 
                                                threads[q.subThreadName]["riskScores"][q.mrLevel].push(score);
                                            }


                                } else {
                                    //weed out troubling "" thread/subthread
                                    if (q.threadName.length>0) {
                                        threadsArr.push(q.subThreadName);
                                        threads[q.subThreadName] = {};
                                        threads[q.subThreadName]["threadName"] = q.threadName;
                                        threads[q.subThreadName]["riskScores"] = {};

                                        //calculate criteria scores, but only for criteria below target MRL
                                        //todo mix this back in later
                                        //if (q.mrLevel <= this.targetMRL) {

                                            //get last item in answers array
                                            //this is the current answer
                                            var cur;
                                            q.answers.forEach (a => { cur = a; });
                                            if (typeof(cur) != "undefined") {
                                                var score = this.calculateRiskScore(cur.likelihood, cur.consequence); 
                                                if (!threads[q.subThreadName]["riskScores"][q.mrLevel]) {
                                                    threads[q.subThreadName]["riskScores"][q.mrLevel] = [];
                                                } 
                                                threads[q.subThreadName]["riskScores"][q.mrLevel].push(score);
                                            }
                                        //}

                                    }
                                }

                          });


                          //now aggregate all the scores and find the max
                          for (var sub in threads) {
                            if (threads.hasOwnProperty(sub)) {
                                for (var mrl in threads[sub]["riskScores"]) {
                                    if (threads[sub]["riskScores"].hasOwnProperty(mrl)) {
                                        if (!threads[sub]["aggRisk"]) {
                                            threads[sub]["aggRisk"] = [];
                                        }

                                        if (threads[sub]["riskScores"][mrl].length < 1) {
                                            threads[sub]["aggRisk"][mrl] = " ";
                                        } else {
                                            threads[sub]["aggRisk"][mrl] = Math.max.apply(null, threads[sub]["riskScores"][mrl]);
                                        }

                                        if (!threads[sub]["aggRiskColor"]) { 
                                            threads[sub]["aggRiskColor"] = [];
                                        }

                                        threads[sub]["aggRiskColor"][mrl] = this.getRiskColor(threads[sub]["aggRisk"][mrl]);
                                    } else {
                                        threads[sub]["aggRisk"][mrl] = " ";
                                        threads[sub]["aggRiskColor"][mrl] = this.getRiskColor(threads[sub]["aggRisk"][mrl]);
                                    }
                                }
                            }
                          }

                          //fill in everyone with no answer and thus no score
                          for (var sub in threads) {
                            if (threads.hasOwnProperty(sub)) {
                                if (typeof(threads[sub]["aggRisk"]) == "undefined") { threads[sub]["aggRisk"] = []; }
                                if (typeof(threads[sub]["aggRiskColor"]) == "undefined") { threads[sub]["aggRiskColor"] = []; }
                    
                                for (var i = 0; i< 10; ++i) {
                                    if (typeof(threads[sub]["aggRisk"][i]) == "undefined") {
                                        threads[sub]["aggRisk"][i] = " ";
                                        threads[sub]["aggRiskColor"][i] = this.getRiskColor(threads[sub]["aggRisk"][i]);
                                    }
                                }
                            }
                          }

                          //final cheap hack to backfill 3 or below 
                          //todo: get full logic from AFRL/Jordan
                          var highest;
                          for (var sub in threads) {
                                highest = null;
                                for (var i = 4; i > 0; --i) {
                                    if (threads[sub]["aggRisk"][i] != " ") {
                                        var highest = threads[sub]["aggRisk"][i];
                                    } else {
                                        if (highest) {
                                            threads[sub]["aggRisk"][i] = highest;
                                            threads[sub]["aggRiskColor"][i] = this.getRiskColor(threads[sub]["aggRisk"][i]);
                                        }
                                    }
                                }

                          }
                       
                            
                          this.threads = threads;
                          this.threadsArr = threadsArr;

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


