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
    }
  }
  `
  private members: any = [];
  private page: String = 'edit';
  private assessmentId: String;
  private assessment: any = {};
  private threads: any;
  private threadsShown: boolean = false;

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
    var threads = await this.assessmentService.getThreads();
    threads.subscribe( ({data}) => {
      var threads = data.allThreadNames;
      // for now, just dealing with the extra array element in the front
      // need to go to back && refactor function grabbing thread names
      threads = JSON.parse(JSON.stringify(threads));
      threads.pop();
      threads[8] = 'H. Facilities';
      this.threads = threads;
    });

    // handle this when there is nope assId
    this.assessmentId = await this.assessmentService.getCurrentAssessmentId();
    if (this.page == 'edit') {
      var assessment = await this.assessmentService.getAssessment(this.editQuery, this.assessmentId)
      assessment.subscribe( ({data}) => {
        this.assessment = data.assessment
        console.log(this.assessment);
      })
    }
  }

  showThreads() {
    this.threadsShown = true;
  }

  closePopover(){
		this.navCtrl.pop();
	}


}
