import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewsComponent } from '../../components/views/views';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	questions {
		mrLevel
		questionText
		subThreadName
		skipped
	}
	}
}
`

@IonicPage()
@Component({
  selector: 'page-skippedquestions',
  templateUrl: 'skippedquestions.html',
})
export class SkippedquestionsPage {

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

	skipped: any;
	assessmentId: any;
	subThreads: any;

  constructor(private apollo: Apollo, public navCtrl: NavController, public navParams: NavParams, public popOver: PopoverController) {
		this.assessmentId = navParams.data.assessmentId;
		console.log(this.assessmentId);
  }

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => { 
					console.log(data) 
					var ok = data.data.assessment.questions.filter(a => a.skipped)
					this.skipped = ok;
					var cool = []
					this.skipped.forEach(s => cool.push(s.subThreadName))
					cool = [... new Set(cool)];
					this.subThreads = cool;
					console.log(cool);

					       

});
	}

  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }

}
