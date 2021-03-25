import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from "apollo-angular";
import {isElectron} from "../../services/constants";
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
	}
}
`

@Component({
  selector: 'report-info-card',
  templateUrl: './report-info-card.component.html',
  styleUrls: ['./report-info-card.component.scss'],
})
export class ReportInfoCardComponent implements OnInit {
  //vars
  text: string;
  @Input() public assessmentId: any;
  public scope: any;
  public targetMRL: any;
  public targetDate: any;
  public location: any;
  public teamMembers: any;
  public name: any;
  isElectron: any;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(){
    this.isElectron = isElectron;

    if (!this.isElectron){
      console.log(this.assessmentId);
      this.apollo.watchQuery({
        query: assessmentQuery,
        variables: {_id: this.assessmentId},
        fetchPolicy: "network-only"
        }).valueChanges
        .subscribe(data => {
          this.setPageVariables((<any>data.data).assessment);
        });
    } else {
      var myStorage = window.localStorage;
			if (myStorage.getItem('inAssessment') == 'true'){
				var fullAssessment = myStorage.getItem('currentAssessment');
				console.log(JSON.parse(fullAssessment));
				this.setPageVariables(JSON.parse(fullAssessment));
			}
    }


  }

  setPageVariables(assessment){
    var assessment = assessment;
    var questions = assessment.questions;
    console.log(assessment);

    this.targetMRL = assessment.targetMRL;
    this.targetDate = assessment.targetDate;
    this.scope = assessment.scope;
    this.location = assessment.location;
    this.teamMembers = assessment.teamMembers;
    this.name = assessment.name;
  }

}
