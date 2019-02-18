/**
*   The purpose of the edit-assessment page is to allow a user to change the
*   higher-level attributes of a given assessment.
*/

import { Component, EventEmitter } from '@angular/core';
import { IonicPage, PopoverController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AssessmentService } from '../../services/assessment.service';
import { Helpers } from '../../services/helpers';

import { UserDashboardPage } from '../user-dashboard/user-dashboard';
import { FileDeleteComponent } from '../../components/file-delete/file-delete';

@IonicPage()
@Component({
  selector: 'page-edit-assessment',
  templateUrl: 'edit-assessment.html',
})

export class EditAssessmentPage {

  private editQuery: any =`
    assessment(_id: $_id) {
    teamMembers {
      name
      email
      role
      }
      scope
      targetMRL
      targetDate
      location
      name
      targetDate
      threads
      levelSwitching
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

  constructor(public navCtrl: NavController,
              private assessmentService: AssessmentService,
              private popovers: PopoverController,
              public navParams: NavParams,
              public help: Helpers, private toast: ToastController )
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
  // the custom deskbooks only need to be loaded if the page is 'new'
    // getCustomDeskbooks() 

    // bring in the normal threads by default. // since now the schema is coming in from the front, we don't need to make a call to the back to get the threads.
   var cool = await this.assessmentService.getDefaultThreads()
      cool.subscribe( threads => this.threads = threads );

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
  async getExistingAssessment() {
    var existingAssessment = await this.assessmentService.queryAssessment(this.assessmentId, this.editQuery);

    // this is needed to get the targetDate into the HTML5 format 
    // threads are coming in as string... change that.
    existingAssessment.subscribe(data => {
      var assessment = data.data.assessment
      console.log(assessment);
      var formattedDate = this.help.formatDate(assessment.targetDate);
      var numberThreads = assessment.threads.map(number => Number(number));
      var extensibleTeamMembers = JSON.parse(JSON.stringify(assessment.teamMembers));
      var formattedAssessment = Object.assign({}, assessment, { teamMembers: extensibleTeamMembers,threads: numberThreads, targetDate: formattedDate });


      this.assessment = formattedAssessment;
    })

  }


  // Click handlers
  showThreads() {
    // check for custom threads
    //    if (assForm.deskbookVersion !== "2017" || assform.deskBookVersion !== "2016" ) {
      // if a custom deskbook is selected, 
      // }
    this.threadsShown = !this.threadsShown;
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
    if ( this.assessment.threads.includes(threadIndex) ) {
      var index = this.assessment.threads.indexOf(threadIndex);
      this.assessment.threads.splice(index, 1);
    } else {
      this.assessment.threads.push(threadIndex);

      // using the indices to ID the threads relies on them being sorted. 
      this.assessment.threads = this.assessment.threads.sort((a,b) => a - b );
    }
  }

  toggleAllThreads() {
    this.threadsSelectButton == 'Unselect All' ? this.unselectAll() : this.selectAll() 
  }

  unselectAll() {
    this.assessment.threads = [];
    this.threadsSelectButton = 'Select All';
  }

  selectAll() {
    this.assessment.threads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    this.threadsSelectButton = 'Unselect All';
  }

  closePopover(){
		this.navCtrl.pop();
	}
  
  formatAssessment() {
  var assessment = Object.assign({}, this.assessment);
    delete assessment.__typename;
    assessment.teamMembers.length > 1 ? assessment.teamMembers.forEach(tm => tm.__typename ? delete tm.__typename : null) : null
    //    delete assessment.teamMembers;
    return assessment;
  }

  async updateAssessment() {
    var assessment = this.formatAssessment();
    var updatedAssessment = await this.assessmentService.updateAssessment(this.assessmentId, assessment);
    updatedAssessment.subscribe(a => {
      this.launchToast();
      this.navCtrl.push(UserDashboardPage);
    });
  }

  launchToast() {
    this.toast.create({
      message: 'assessment updated',
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'ok'
    }).present();
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

  addMember(nameIn:string,emailIn:string,roleIn:string){
    var newMember = {name: nameIn, email: emailIn, role: roleIn};
    // this.members.push(newMember);
    this.assessment.teamMembers.push(newMember);

		var name = <any>(document.getElementById("memName"));
		name.value = "";
		var email = <any>(document.getElementById("memEmail"));
		email.value = "";
		var role = <any>(document.getElementById("memRole"));
		role.value = "";
		this.presentToast();
  }

  async removeMember(memEmail){
  // var removedTeamMember = await this.assessmentService.removeTeamMember(this.assessmentId, memEmail)
    var removeTeamMemberEmitter = new EventEmitter();
    //removedTeamMember.subscribe(({data}) => {
    removeTeamMemberEmitter.subscribe( event => {
        var newMembers = this.assessment.teamMembers.filter(member => member.email !== memEmail);
        this.assessment.teamMembers = newMembers;
        this.launchRemoveTeamMemberToast(memEmail);
    });

    var teamMemberRemoveData = {
      emitter: removeTeamMemberEmitter,
      typeToDelete: 'teamMember',
      assessmentId: this.assessmentId,
      teamMemberEmail: memEmail
    };

    this.popovers.create(FileDeleteComponent, teamMemberRemoveData)
      .present({ev: event})
  }

  launchRemoveTeamMemberToast(removedEmail) {
    var toast = this.toast.create({
      message: removedEmail + ' has been removed from this assessment',
      duration: 3000,
      position: 'top'
    })
    toast.present();
 }


	presentToast() {
	  let toast = this.toast.create({
	    message: 'Member added to assessment and emailed',
	    duration: 2000,
	    position: 'middle'
	  });
	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  toast.present();
}
  

  /**
  *   This function sets `this.schema` to an array of 'thread objects'
  *   If a standard deskbook version is selected, pull from assets
  *   If a custom deskbook is selected, get from user
  *      --> currently, this is in the localstorage
  */
  async setSchema() {
    
  }


}
