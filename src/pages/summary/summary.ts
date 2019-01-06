import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewsComponent } from '../../components/views/views';
import { TopbarComponent } from "../../components/topbar/topbar";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { LegendPopoverComponent } from '../../components/legend-popover/legend-popover';

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
                            questions.forEach(q => {
                                if (threadsArr.indexOf(q.threadName) > -1) {
                                } else {
                                    if (q.threadName.length>0) {
                                        threadsArr.push(q.threadName);
                                    }
                                }
       


                                //weed out troubling "" thread 
                                if (q.threadName.length>0) {
                                    if (!threads[q.threadName]) { 
                                        threads[q.threadName] = {};
                                    }
                                    threads[q.threadName]["name"] = q.threadName; 

                                    //setup subthreads
                                    if (!threads[q.threadName][q.subThreadName]) { 
                                        threads[q.threadName][q.subThreadName] = {};
                                    }
                                    threads[q.threadName][q.subThreadName] = q.subThreadName;

                                    if (typeof threads[q.threadName]["subThreads"] !== 'undefined' && 
                                        threads[q.threadName]["subThreads"].length > 0) {
                                    } else {
                                        threads[q.threadName]["subThreads"] = [];
                                    }

                                    //make sure we're building subThreads array without dups
                                    if (threads[q.threadName]["subThreads"].indexOf(q.subThreadName) > -1) {
                                    } else {
                                        threads[q.threadName]["subThreads"].push(q.subThreadName);
                                    }
                                }

                          });
                          this.threads = threads;
                          this.threadsArr = threadsArr;
                          console.log("DEBUG A");
                          console.log(this.threads);

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
      return " ";
    }
  }



}


