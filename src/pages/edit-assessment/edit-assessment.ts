/**
*   The purpose of the edit-assessment page is to allow a user to change the
*   higher-level attributes of a given assessment.
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssessmentService } from '../../services/assessment.service';
import gql from "graphql-tag";

var gqlQuery = `

`

@IonicPage()
@Component({
  selector: 'page-edit-assessment',
  templateUrl: 'edit-assessment.html',
})

export class EditAssessmentPage {

  private editQuery: any =`
    assessment(_id: $_id) {
      teamMembers
      scope
      targetMRL
      targetDate
      location
      name
      targetDate
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
    // edit 
    // if the page is in 'edit' mode, we're going to have an assessment id, and going to get that assessment's info... but we don't need to bring down any of the questions.

  }

  // things you can change
  // -

  // things you can't --> the underlying schema

  // INIT 
  /**
  *   steps on init
  */
  async ngOnInit() {
  // the custom deskbooks only need to be loaded if the page is 'new'
    // getCustomDeskbooks() 

    // bring in the normal threads by default. // since now the schema is coming in from the front, we don't need to make a call to the back to get the threads.
   var cool = await this.assessmentService.getDefaultThreads()
      cool.subscribe( threads => this.threads = threads );

      console.log(this.threads);

    // handle this when there is nope assId
    this.assessmentId = await this.assessmentService.getCurrentAssessmentId();
    if (this.page == 'edit') {
      this.getExistingAssessment();
    }
  }

  async getCustomDeskbooks() {
  // var user = await this.auth.currentUser();  
    // what do we actually need with the Custom Deskbooks?
    // -- the name of the assessment 
    // -- the threads
    // that's all initially
  }

  /**
  *    purpose: set this.assessment to fields defined in editQuery
  *    @input: String assessment id 
  *            String gql query 
  *    @output: none, SE
  *    @SE:     sets this.assessment 
  */
  // input - assessment id 
  // output -
  async getExistingAssessment() {
    var existingAssessment = await this.assessmentService.queryAssessment(this.assessmentId, this.editQuery);

    existingAssessment.subscribe(data => this.assessment = data.data.assessment ); 

  }


  // Click handlers
  showThreads() {
    // check for custom threads
    //    if (assForm.deskbookVersion !== "2017" || assform.deskBookVersion !== "2016" ) {
      // if a custom deskbook is selected, 
      // }
    this.threadsShown = true;
  }

  /**
  *   @purpose: toggle whether a thread is included in a particular assessment
  *             threads array contains ids of threads used [1,2,3,4...etc]
  *   @inputs   @1 event = click event why do we need event?
  *             @2 threadName = 'string' 
  *
  */
  toggleThread(event, threadName) {
    var threadIndex = this.threads.indexOf(threadName) + 1;
    if ( this.threadsSelected.includes(threadIndex) ) {
      var index = this.threadsSelected.indexOf(threadIndex);
      this.threadsSelected.splice(index, 1);
    } else {
      this.threadsSelected.push(threadIndex);

      // using the indices to ID the threads relies on them being sorted. 
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

  // How to share the common elements, and not the different elements.
  // the elements which are different are the save/update functionality
  // what is actually different?
  // ON INIT
  // edit - have a current assessment's values to load in.
  // new - have to load in the custom deskbooks.

  // otherwise the basic functionality is the same ... we're changing an Angular model behind the scenes.

  // ON SAVE
  // new - create a new assessment, email the peeps, 
  

  /**
  *   This function sets `this.schema` to an array of 'thread objects'
  *   If a standard deskbook version is selected, pull from assets
  *   If a custom deskbook is selected, get from user
  *      --> currently, this is in the localstorage
  */
  async setSchema() {
    
  }


}
