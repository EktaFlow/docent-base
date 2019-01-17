/**
*   The purpose of the edit-assessment page is to allow a user to change the
*   higher-level attributes of a given assessment.
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssessmentService } from '../../services/assessment.service';
import gql from "graphql-tag";

@IonicPage()
@Component({
  selector: 'page-edit-assessment',
  templateUrl: 'edit-assessment.html',
})
export class EditAssessmentPage {

  private editQuery: any = gql`
  query assessment($_id: String) {
    assessment(_id: $_id) {
      teamMembers
      scope
      targetMRL
      targetDate
      location
      name
      levelSwitching
    }
  }
  `
  private members: any = [];
  private page: String = 'edit';
  private assessmentId: String;
  private assessment: any = {};
  private assess: any;

  constructor(public navCtrl: NavController,
              private assessmentService: AssessmentService,
              public navParams: NavParams )
  {
    this.page = this.navParams.get('page');
  }

  // things you can change
  // -

  // things you can't --> the underlying schema

  async ngOnInit() {
    // handle this when there is no assId
    this.assessmentId = await this.assessmentService.getCurrentAssessmentId();
    if (this.page == 'edit') {
      var assessment = await this.assessmentService.getAssessment(this.editQuery, this.assessmentId)
      assessment.subscribe( ({data}) => {
        this.assessment = data.assessment
        this.assess = JSON.parse(JSON.stringify(this.assessment));
        console.log(this.assess);
        console.log(this.assessment);
        this.formattingValues();

      })
    }
  }

  //table this function for now
  //trying to figure out how to actually save the formatting date so we can display it

  formattingValues(){
    this.assess.targetDate = this.formatDate();

    // if (!this.assess.levelSwitching){
    //   this.assess.levelSwitching = "No";
    // }
  }

  formatDate() {
    var date;
    if (this.assessment.targetDate){
      date = this.assessment.targetDate;
    }

  if (!date) {
    return null;
  } else {
    return new Date(date)
           .toISOString()
           .slice(0,10);
  }
  }

  closePopover(){
		this.navCtrl.pop();
	}

  updateAssessment(e){
    //need to access correct assessment
    //then make sure we have a mutation for it in the back
    //then call that query and send the information over
    
  }


}
