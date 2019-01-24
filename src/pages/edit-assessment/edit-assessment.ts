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
  private threadsSelectButton: string = 'Unselect All';
  private oThreads: any = [1,3,5,7,9];
  private threadsSelected: any = [1,3,5,7,9] // array 

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
  // var user = await this.auth.currentUser();  
    // what do we actually need with the Custom Deskbooks?
    // -- the name of the assessment 
    // -- the threads
    // that's all initially
  }


 

  // Click handlers
  showThreads() {
    // check for custom threads
    //    if (assForm.deskbookVersion !== "2017" || assform.deskBookVersion !== "2016" ) {
      // if a custom deskbook is selected, 
      // }
    this.threadsShown = true;
  }

  toggleThread(event, threadName) {
    var threadIndex = this.threads.indexOf(threadName) + 1;
    if ( this.threadsSelected.includes(threadIndex) ) {
      var index = this.threadsSelected.indexOf(threadIndex);
      this.threadsSelected.splice(index, 1);
    } else {
      this.threadsSelected.push(threadIndex);

      this.threadsSelected = this.threadsSelected.sort((a,b) => a - b );
    }
  }

  toggleAllThreads() {
    this.threadsSelectButton == 'Unselect All' ? this.unselectAll() : this.selectAll() 
  }

  unselectAll() {
    this.threadsSelected = [];
    this.threadsSelectButton = 'Select All';
  }

  selectAll() {
    this.threadsSelected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    this.threadsSelectButton = 'Unselect All';

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
  //  if (!this.validateAssessment()) {
      // handle invalid assessment;
      //  }

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
