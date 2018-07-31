import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from '../../components/topbar/topbar';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	questions {
		mrLevel
		questionText
		subThreadName
		currentAnswer
	}
	}
}
`

@IonicPage()
@Component({
  selector: 'page-notapplicable',
  templateUrl: 'notapplicable.html',
})
export class NotapplicablePage {

	na: any;
	assessmentId: any;
	subThreads: any;

  schema = [
    {
      header:"Technology Maturity",
      mrl:4,
      questions:[
        "Is the Technology Readiness at TRL 4 or greater?"
      ]
    },
    {
      header:"Technology & Industrial Base",
      mrl:4,
      questions:[
        "Have industrial base capabilities and gpas/risks been identified for key technologies, components, and/or key processes?",
        "Have pertinenet Manufacturing Sciene (MS) and Advanced Manufacturing Technology requirements been identified?"
      ]
    }
  ];

	constructor( private apollo: Apollo, 
							 public navCtrl: NavController, 
							 public navParams: NavParams, 
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
		console.log(this.assessmentId);
  }

  // helper function to pull unique values from array.
	unique = (item, index, array) => array.indexOf(item) == index
	
	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => { 
			console.log(data);
			var naQuestions: any = data.data.assessment.questions.filter(a => a.currentAnswer == "N/A")
					this.na= naQuestions;
					console.log(naQuestions);

					var subThreadNames = naQuestions.map(s => s.subThreadName);
					this.subThreads = subThreadNames.filter(this.unique);
			});
	}

	filterBySubThread(subThread) {
		return this.na.filter(s => s.subThreadName == subThread);
	}

  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }
}
