import { Component, Input } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
    deskbookVersion
    name
		# id
		teamMembers
    targetMRL
    targetDate
    location
    scope
	}
}
`

/**
 * Generated class for the ReportInfoCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'report-info-card',
  templateUrl: 'report-info-card.html'
})
export class ReportInfoCardComponent {

  text: string;
  @Input() public assessmentId: any;
  public scope: any;
  public targetMRL: any;
  public targetDate: any;
  public location: any;
  public teamMembers: any;


  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit(){
    console.log(this.assessmentId);
    this.apollo.watchQuery({
      query: assessmentQuery,
      variables: {_id: this.assessmentId},
      fetchPolicy: "network-only"
      }).valueChanges
      .subscribe(data => {
        var assessment = (<any>data.data).assessment;
        var questions = assessment.questions;
        console.log(assessment);

        this.targetMRL = assessment.targetMRL;
        this.targetDate = assessment.targetDate;
        this.scope = assessment.scope;
        this.location = assessment.location;
        this.teamMembers = assessment.teamMembers;
      });

  }



}
