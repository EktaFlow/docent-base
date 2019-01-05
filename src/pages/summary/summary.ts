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
	questions {
		mrLevel
		questionText
		threadName
		subThreadName
		currentAnswer
		questionId
                answers {
		when
		who
		risk
		what
		reason
		assumptionsNo
                notesNo
                answer
                # technical
		# schedule
                # cost
                }
	}
	files {
		name
		questionId
		url
	}
	}
}

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	targetMRL
	targetDate
	location
        scope
	questions {
		questionId
		mrLevel
		questionText
		threadName
		subThreadName
		currentAnswer
            answers {
                risk
            }
	}
	files {
		name
		questionId
		url
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

	allQuestions: any;
	assessmentId: any;
        questionSet: any;
	showAll: any;
	pageName: any = "Summary";

	constructor( private apollo: Apollo,
							 public navCtrl: NavController,
							 public navParams: NavParams,
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
  }



  async ngOnInit() {
  }

}
