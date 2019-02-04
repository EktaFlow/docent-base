import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
          deskbookVersion
          name
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
                notesNo
                notesYes
                notesNA
	        	    likelihood
                consequence
                greatestImpact
                riskResponse
                mmpSummary
            }
    	   }
	  }
}
`

/**
 * Generated class for the RiskReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-risk-report',
  templateUrl: 'risk-report.html',
})
export class RiskReportPage {

  assessmentId: any;
  pageName: any = "Detailed Risk Report";

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.assessmentId = navParams.data.assessmentId;
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("RiskReport");
  }

  async ngOnInit(){
    this.apollo.watchQuery({
      query: assessmentQuery,
      variables: {_id: this.assessmentId},
      fetchPolicy: "network-only"
      }).valueChanges
      .subscribe(data => {
        var assessment = (<any>data.data).assessment;
        var questions = assessment.questions.filter(q => q.mrLevel == assessment.targetMRL);


        console.log(assessment);
        console.log(questions);
      });
  }

}
