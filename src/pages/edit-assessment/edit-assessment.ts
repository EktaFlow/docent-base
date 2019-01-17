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
  private customThreads: any = {};
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

  // INIT 
  /**
  *   steps on init
  */
  async ngOnInit() {
    // getCustomDeskbooks() 
    // bring in the normal threads by default. // since now the schema is coming in from the front, we don't need to make a call to the back to get the threads.
   var cool = await this.assessmentService.getDefaultThreads()
      cool.subscribe( threads => this.threads = threads );

      console.log(this.threads);

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

  async getCustomDeskbooks() {
    var user = await this.auth.currentUser();  
    // what do we actually need with the Custom Deskbooks?
    // -- the name of the assessment 
    // -- the threads
    // that's all initially
  }


  // Click handlers
  showThreads() {
    // check for custom threads
    if (assForm.deskbookVersion !== "2017" || assform.deskBookVersion !== "2016" ) {
      // if a custom deskbook is selected, 
    }
    this.threadsShown = true;
  }

  closePopover(){
		this.navCtrl.pop();
	}
  
  async updateAssessment() {
    console.log('we updaing');
    // format the assessmentVariables as needed
    // var updatedVariables = this.formatAssessmentVariables();
    // var updatedAssessment = await this.assessmentService.updateAssessment(updatedVariables)
    // updatedAssessment.toPromise()
    //   .then(a => {
    //   // launch toast for success
    //   // redir to Home page (with that assessment selected?)
    //   })
    //   .catch( e => // toast error);
  }

  async createAssessment() {
    if (!this.validateAssessment()) {
      // handle invalid assessment;
    }

    await this.setSchema();
     
  }

  ////////
  /**
  *   This function sets `this.schema` to an array of 'thread objects'
  *   If a standard deskbook version is selected, pull from assets
  *   If a custom deskbook is selected, get from user
  *      --> currently, this is in the localstorage
  */
  async setSchema() {
    
  }


}
