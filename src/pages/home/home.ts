/*
*   The purpose of the Home Page is (currently) to both diplay the login information
*		and create a new assessment.
*   TODO: mpf - split this into a loginpage and a newassessment page
*/

import { Component, EventEmitter } from '@angular/core';
import { NavController, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { QuestionsPage } from '../questions/questions';
import { ThreadsListComponent } from "../../components/threads-list/threads-list";
import { PasswordResetComponent } from '../../components/password-reset/password-reset';
import { AuthService } from "../../services/auth.service";
import { AssessmentService } from "../../services/assessment.service";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { LoginPage } from '../login/login';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var threadsQuery = gql`
query {
	allThreadNames
}
`

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
	loading: boolean;
	assessments: any;
  schema: any;
	twentySeventeen: any;
	assForm: any = {deskBookVersion: "2017", levelSwitching: false, teamMembers: [], threads: [1,2,3,4,5,6,7,8,9,10]};
  members = [];
	threadsSelected: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	private showRegister: boolean = false;
	private mobileRegister: boolean = false;
	public deskbookVersions: any = ['2018', "2017", "2016"];
  private threadsShown: boolean = false;
  private threads: any;
  private threadsSelectButton: string = 'Unselect All';
	assessment: any;

  constructor(public navCtrl: NavController,
							public popOver: PopoverController,
							private apollo: Apollo,
							private auth: AuthService,
              private assessmentService: AssessmentService,
              private http: HttpClient,
							private loadingCtrl: LoadingController,
							private toastCtrl: ToastController) {}

							ionViewWillEnter() {
						    GoogleAnalytics.trackPage("home");
						  }

	validateAssessment() {
		var fields = [
			"name",
			"targetMRL"
		];

		return fields.every(field => this.assForm[field])
	}

	presentLoadingDefault() {
	  let loading = this.loadingCtrl.create({
		  spinner: 'crescent',
		  content: 'Assessment Loading In, Please Wait',
		  dismissOnPageChange: true
	  });


	  loading.present();
  }

  invalidInputToast() {
	  var toast = this.toastCtrl.create({
	    message: 'Please ensure your assessment has a name and target MR Level',
	    duration: 4500,
      showCloseButton: true,
      position: 'top',
      cssClass: 'error-toast'
	  });

    toast.present();
  }

	async createAssessment(event) {
		event.preventDefault();
		if (!this.validateAssessment()) {
      this.invalidInputToast();
			return null;
		}

		await this.getSchema(this.assForm.deskBookVersion);

		var variables = this.formatAssessmentVariables();
    console.log(variables);
		this.presentLoadingDefault();

		var newAssessment = await this.assessmentService.createAssessment(variables);
		newAssessment.toPromise()
            .then( d => {
              console.log(d);

              var assessmentId = d.data.createAssessment._id;
              this.sendEmailsToTeamMembers(assessmentId);
              this.startAssessment(assessmentId);

            })
            .catch(e => {
              alert('invalid JSON');
            });

	}

	formatAssessmentVariables() {
		var formValues = this.assForm;
		return {
			threads:            formValues.threads,
			location:           formValues.location,
			targetMRL:          formValues.targetMRL,
			name:               formValues.name,
			levelSwitching:     formValues.levelSwitching,
			deskbookVersion:    formValues.deskBookVersion,
			teamMembersUpdates: formValues.teamMembers,
			userId:						  this.auth.currentUser()._id,
			userEmail: 		      this.auth.currentUser().email,
			scope:            formValues.scope,
			targetDate:       formValues.targetDate,
			schema: 					JSON.stringify(this.schema)
		};
	}

	async sendEmailsToTeamMembers(assessmentId) {
		var teamMembers = this.assForm.teamMembers.map(mem => mem.email);

		// move this to constants when we decide it's home.
		var url = "https://web.mfgdocent.com/auth/share";

	// this makes sense in auth b/c we probably do want some user checking here, right?
		fetch(url, {
			method: "POST",
			headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
				},
			body: JSON.stringify({
				recipients: teamMembers,
				assessmentId
			})
		})
		.then(a => console.log("okok"))
		.catch(e => console.error(e));
	}

	// this function sets a couple default values and brings in the threads
	async ngOnInit() {
	// setting defaults, ionic is weird with this.
  //have to cast to HTMLInputElement which contains value prop
    var tmp = <HTMLInputElement>document.getElementById("level-switching-select");
    tmp ? tmp.value = "" : null
    tmp = <HTMLInputElement>document.getElementById("deskbook-select");
	  tmp ? tmp.value = "2017" : null;

		if (this.auth.currentUser()) {
      var cool = await this.assessmentService.getDefaultThreads()
      cool.subscribe( threads => this.threads = threads );
		this.apollo.watchQuery<any>({
			query: threadsQuery
			})
			 .valueChanges
			 .subscribe(({data, loading}) => {

					this.setUpDeskbookArray();
			 });

			 }

	}

  async updateThreads() {
    var selectedDeskbookName = this.assForm.deskBookVersion;
    console.log(this.assForm.deskBookVersion);
    // go from the name of the deskbook to an array of the threads.
    if ( selectedDeskbookName == '2018' || selectedDeskbookName == '2017' || selectedDeskbookName == '2016' ) {
      var cool = await this.assessmentService.getDefaultThreads()
      cool.subscribe( threads => this.threads = threads );
      return null;
    }

			var user = await this.auth.currentUser();
			var files = [];

			for (let file of user.jsonFiles){
				var newFile = JSON.parse(file);
        if (typeof newFile == 'string' ) {
          newFile = JSON.parse(newFile);
        }

				files.push(newFile);
			}

			var deskbookFile = files.filter(f => f.fileName == selectedDeskbookName);
			var selectedDeskbook  = deskbookFile[0].file;
    
      var threads = selectedDeskbook.map(t => t.name)
                      .filter(tname => tname.length > 0);
      this.threads = threads;
  }



	async getSchema(deskbook) {
		if (deskbook == '2016' || deskbook == '2017' || deskbook == '2018'){
			var deskbookPath = 'assets/json/' + deskbook + '.json'
			var schema = await this.http.get(deskbookPath).toPromise();
                        this.schema = schema;
		} else {
			var user = await this.auth.currentUser();
			var files = [];

			for (let file of user.jsonFiles){
        console.log(file);
				var newFile = JSON.parse(file);
        if (typeof newFile == 'string') {
          newFile = JSON.parse(newFile);
        }
				files.push(newFile);
			}

			var deskbookFile = files.filter(f => f.fileName == deskbook);
			this.schema = deskbookFile[0].file;
		}
	}

	////////// METHODS TO LAUNCH POPOVERS //////////////////////////////
	// TODO:  abstract general popover logic<01-08-18, mpf> //

    handleResetClick() {
      this.popOver.create( PasswordResetComponent, {}, {cssClass: 'password-reset'})
                    .present();
    }

	showRegisterForm = () => this.showRegister = true;
	mobileRegisterForm() {
		this.showRegister = true;
		this.mobileRegister = true;
	}

	showThreads(myEvent) {
    this.threadsShown = !this.threadsShown;
	}

  addMember(nameIn:string,emailIn:string,roleIn:string){
    var newMember = {name: nameIn, email: emailIn, role: roleIn};
    this.members.push(newMember);
    this.assForm.teamMembers.push(newMember);

		var name = <any>(document.getElementById("memName"));
		name.value = "";
		var email = <any>(document.getElementById("memEmail"));
		email.value = "";
		var role = <any>(document.getElementById("memRole"));
		role.value = "";
		this.presentToast();
  }

	presentToast() {
	  let toast = this.toastCtrl.create({
	    message: 'Member added to assessment and emailed',
	    duration: 2500,
	    position: 'top'
	  });
	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  toast.present();
}

  removeMember(memEmail){
		this.members = this.members.filter(m => m.email != memEmail);
		this.assForm.teamMembers = this.assForm.teamMembers.filter(m => m.email != memEmail);
    // this.members.pop();
    // this.assForm.teamMembers.pop();
  }

  async startAssessment(_id){
		await this.assessmentService.setCurrentAssessmentId(_id);
    this.navCtrl.push(QuestionsPage);
  }

  newLogin() {
    this.navCtrl.push(LoginPage);
  }

	async setUpDeskbookArray() {
		var user = await this.auth.currentUser();
		// this.deskbookVersions = ["2017", "2016"];
		for (let file of user.jsonFiles){
      console.log(file);
			var newFile = JSON.parse(file);
      if ( typeof newFile == 'string' ) {
        newFile = JSON.parse(newFile);
      }
			this.deskbookVersions.push(newFile.fileName);
		}
	}

  toggleThread(event, threadName) {
    var threadIndex = this.threads.indexOf(threadName) + 1;
    if ( this.assForm.threads.includes(threadIndex) ) {
      var index = this.assForm.threads.indexOf(threadIndex);
      this.assForm.threads.splice(index, 1);
    } else {
      this.assForm.threads.push(threadIndex);

      // using the indices to ID the threads relies on them being sorted.
      this.assForm.threads = this.assForm.threads.sort((a,b) => a - b );
    }
  }

  toggleAllThreads() {
    this.threadsSelectButton == 'Unselect All' ? this.unselectAll() : this.selectAll()
  }

  unselectAll() {
    this.assForm.threads = [];
    this.threadsSelectButton = 'Select All';
  }

  selectAll() {
    this.assForm.threads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    this.threadsSelectButton = 'Unselect All';
  }

}
