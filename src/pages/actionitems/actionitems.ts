import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from '../../components/topbar/topbar';
import { AssessmentService } from '../../services/assessment.service';

import { QuestionsPage } from '../questions/questions';

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
		# mpf - for now bringing in all No vars.
		when
		who
		risk
		what
		reason
		assumptionsNo
    notesNo
    technical
		schedule
    cost	
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
  selector: 'page-actionitems',
  templateUrl: 'actionitems.html',
})
export class ActionitemsPage {

	no: any;
	assessmentId: any;
	private attachments: any;

	constructor( private apollo: Apollo, 
							 public navCtrl: NavController, 
							 public navParams: NavParams, 
							 public popOver: PopoverController,
               private assessmentService: AssessmentService) {} 

	unique = (item, index, array) => array.indexOf(item) == index

	async ngOnInit() {
		this.assessmentId = await this.assessmentService.getCurrentAssessmentId();

		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => { 
					this.no = (<any>data.data).assessment.questions.filter(a => a.currentAnswer == "No");
					this.attachments = (<any>data.data).assessment.files;
			});
	}

	displayRisks(q) {
				var risks = [];
				q.technical ? risks.push("Technical") : null
				q.schedule  ? risks.push("Schedule")	: null
				q.cost      ? risks.push("Cost")			: null
					
				return risks.join(", ") || "none";
	}

	getAttachments(q) {
	  return	this.attachments.filter(a => a.questionId == q.questionId );
	}

	navToQuestion(questionId) {
		this.navCtrl.push(QuestionsPage, {
			questionId: questionId
		});
	}

}
