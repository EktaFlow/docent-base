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
		threadName
		subThreadName
		currentAnswer
		notesNo
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

  schema = [
    {
      header:"Cost & Funding",
      subheader:"Production Cost Knowledge (Cost modeling)",
      mrl:"3",
      question:"Have initial cost targets and risks been identified?",
      reason:"This",
      action:"is",
      assumptions:"an",
      notes:"example",
      risks:"of",
      teamMembers:"the",
      attatchments:"schema"
    }
  ];

	constructor( private apollo: Apollo, 
							 public navCtrl: NavController, 
							 public navParams: NavParams, 
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
		console.log(this.assessmentId);
  }

	unique = (item, index, array) => array.indexOf(item) == index

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => { 
					this.no= (<any>data.data).assessment.questions.filter(a => a.currentAnswer == "No");
					var subThreadNames: any = this.no.map(s => s.subThreadName);
					this.subThreads = subThreadNames.filter(this.unique);
					console.log(this.no);
			});
	}

  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }

}
