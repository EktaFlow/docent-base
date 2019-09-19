import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from '@ionic/angular';
import { AuthService } from "./auth.service";
import { AssessmentService } from "./assessment.service";
import { TopbarComponent } from "../topbar/topbar.component";
import { FileDeleteComponent } from '../file-delete/file-delete';
import { SettingsPage } from "../settings/settings";
import { QuestionsPage } from "../questions/questions";
import { DashboardPage } from "../dashboard/dashboard";
import { ActionitemsPage } from "../actionitems/actionitems";
import { EditAssessmentPage } from '../edit-assessment/edit-assessment';
import { AddTeamMembersPopOverComponent } from "../add-team-members-pop-over/add-team-members-pop-over";
import { GoogleAnalytics } from '../helpers/GoogleAnalytics';
import { ImportComponent } from "../import/import";
import { saveAs } from "file-saver/FileSaver";
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HomePage } from "../home/home";
import {Subscription} from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { AuthUrl } from "../constants";

var sharedQuery = gql`
query getShared($assessments: [String]) {
	getShared(assessments: $assessments) {
		scope
		targetMRL
    targetDate
    levelSwitching
    deskbookVersion
    location
    name
		id
		teamMembers {
			name
			email
			role
		}
		userId
		userEmail
	}
}
`
var assessmentQuery = gql`
query assessment($_id: String)
{
 assessment(_id: $_id)  {
  userId
  userEmail
  scope
  targetMRL
  teamMembers {
    name
    email
    role
  }
  levelSwitching
  targetDate
  location
  deskbookVersion
  name
  threads
	questions{
		questionText
	  currentAnswer
		questionId
    threadName
    subThreadName
    mrLevel
		questionId
    helpText
    criteriaText
    answers {
      userId
      updatedAt
      answer
      likelihood
      consequence
      greatestImpact
      riskResponse
      mmpSummary
  		objectiveEvidence
  		assumptionsYes
  		notesYes
  		who
  		when
  		what
  		reason
  		assumptionsNo
  		notesNo
  		documentation
  		assumptionsNA
  		notesNA
      assumptionsSkipped
      notesSkipped
    }
  }
	files {
    id
    caption
    name
    questionId
		url
	}
}
}
`
@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {

  public user: any = {
    name: "",
    email: "",
    id: ""
  };

  assessments: any;
	sharedAssessments: any = [];
  loading: boolean;
  private querySubscription: Subscription;
	private sharedAssessmentIds = [];
	expand: any = false;
  currentAssessment: any = null;
	noSecondBar: boolean = false;
	assessmentId: any;
	pageName: any = "User Dashboard";

	showMine: boolean = false;
	showShared: boolean = false;
	assessmentsBox: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
							private apollo: Apollo,
							private auth: AuthService,
              private assessmentService: AssessmentService,
							public popOver: PopoverController,
              public router: RouterModule,
              private activatedRoute: ActivatedRoute) {
							// this.assessmentId = navParams.data.assessmentId;
              this.assessmentId = this.activatedRoute.snapshot.paramMap.get('assessmentId');
              }


							ionViewWillEnter() {
						    GoogleAnalytics.trackPage("user-dashboard");
						  }

  async ngOnInit() {

		// TODO make this better
		await this.getSharedAssessments();
		this.pullSharedAssessments();

		var user = this.auth.currentUser();
		this.user = user;

		var observe =  await this.assessmentService.getAssessments(user);
		observe.subscribe(({data}) => {
			this.assessments = data.assessments;
			this.assessments = JSON.parse(JSON.stringify(this.assessments));
			console.log(this.assessments);
		});
		if (window.screen.width > 440) {
			this.showMine = true;
			this.showShared = true;
		}



  }



	async getSharedAssessments() {
		var user;
		if (this.auth.currentUser()) {
		 user = this.auth.currentUser();
			await fetch(AuthUrl + "shared", {
			method: "POST",
			body: JSON.stringify({email: user.email}),
			headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
			},
		})
			.then(a => a.json())
			.then(a => this.sharedAssessmentIds = a )
			.catch(e => console.log(e));
			} else {
			console.log('we not in auth.currentU');
			}

	}



	launchImportPopover() {
		this.popOver.create(ImportComponent)
								.then(popover => popover.present());
	}

	handleImport() {
		this.launchImportPopover();
	}

	pullSharedAssessments() {
	console.log(this.sharedAssessmentIds);

		this.apollo.watchQuery<any>({
      query: sharedQuery,
      variables: {
        assessments: this.sharedAssessmentIds
      }
    })
    .valueChanges
    .subscribe(({data, loading}) => {
		  // TODO, make this a better fix else where...
			var noNulls = data.getShared.filter( id => id);
			this.sharedAssessments = noNulls;
			// data.getShared.every( a => a ) ? this.sharedAssessments = data.getShared : null
    });

	}

	handleSave(assessmentId) {
		this.apollo.watchQuery<any>({
		query: assessmentQuery,
		fetchPolicy: "network-only",
		variables: {_id: assessmentId}
	})
		.valueChanges
		.subscribe( ({data, loading}) => {
			console.log('we firin up a save')
			console.log(event.target);
			var title = data.assessment.name;
			title ? null : title = "untitled"
			var assessment = JSON.stringify(data);
			saveAs(new Blob([assessment], { type: "text/plain" }), title + ".mra")
			// this.close();
		})

	}

	public truncate(value: string, limit = 30, completeWords = true, ellipsis = '…') {
  let lastindex = limit;
  if (completeWords) {
    lastindex = value.substr(0, limit).lastIndexOf(' ');
  }
  return `${value.substr(0, limit)}${ellipsis}`;
}

  expandAssessment(assessmentId) {
    // this.expand = !this.expand;
    if (this.currentAssessment == assessmentId) {
      this.currentAssessment = null;
    } else {
      this.currentAssessment = assessmentId;
    }
		window.setTimeout(this.scrollToElement(assessmentId), 500);

		// target.scrollIntoView();
  }

	expandAssessmentMobile(assessmentId){
		if (this.currentAssessment == assessmentId) {
      this.currentAssessment = null;
    } else {
      this.currentAssessment = assessmentId;
    }
	}

	scrollToElement(assessmentId){
		var target = document.getElementById(assessmentId);
		target.scrollIntoView({behavior: "smooth", block: "center"});
	}

	// the navigation functions from within an assessment, should each set the new global assessment service Id
	// set Assessment and Navigate

	async continueAssessment(assessmentId) {
		await this.assessmentService.setCurrentAssessmentId(assessmentId);
    this.router.navigate(["/questions", {assessmentId: this.assessmentId}]);
		// this.navCtrl.push(QuestionsPage);
	}

	async openDashboard(assessmentId) {
		await this.assessmentService.setCurrentAssessmentId(assessmentId);
    this.router.navigate(["/dashboard", {assessmentId: this.assessmentId}]);


		console.log(assessmentId);

	}

	async openActionItems(assessmentId) {
		await this.assessmentService.setCurrentAssessmentId(assessmentId);
    this.router.navigate(["/action-items", {assessmentId: this.assessmentId}]);
     // this.navCtrl.push(ActionitemsPage, {assessmentId: assessmentId});
	}

	// redirectToCreate(){	this.navCtrl.push(HomePage);	}

  // handleSettings(){ this.navCtrl.push(SettingsPage);}

  async handleEditAssessmentClick(assessmentId) {
    await this.assessmentService.setCurrentAssessmentId(assessmentId);
    this.router.navigate(["/edit-assessment", {page: 'edit'}]);


    // Go to page to edit assessment.
    // this.navCtrl.push(EditAssessmentPage, {page: 'edit'});
  }

	toggleMine = () => {this.showMine = !this.showMine;}
	toggleShared = () => {this.showShared = !this.showShared;}

  /**
  *   launch delete popover, pass assessment type
  *   create an emitter to recieve user response from popover,
  *   if emitter returns truthy, go use assessment service delete,
  *   & remove from view
  *   assessmentId: the assessmentId of the assessment to be deleted
  */
	async handleDeleting(assessmentId){
    var emitter =  new EventEmitter<any>();
    emitter.subscribe(deleteFile => {
      if (deleteFile) {
        this.assessmentService.deleteAssessment(assessmentId)
        .then(a => a.toPromise())
        .catch( err => console.error('cant resolve to Promise'))
        .then(p => this.removeAssessmentFromPage(assessmentId))
        .catch( err => console.error('cant remove from page'));
      }
    });

    this.popOver.create(FileDeleteComponent, {emitter: emitter, typeToDelete: 'assessment'})
                .then(popover => popover.present());
	}

	presentAddTeamMembersPopOver(assessmentId){
		let myEmitter = new EventEmitter<any>();
		myEmitter.subscribe( data =>  {
		console.log(data);
		var assIndex= this.assessments.findIndex(a => a.id == assessmentId);
		this.assessments[assIndex].teamMembers.push(data.data.addTeamMember);
		console.log(this.assessments[assIndex]);
		});

		this.popOver.create(
      AddTeamMembersPopOverComponent,
			{assessmentId: assessmentId, emitter: myEmitter},
			{cssClass: 'team-popover'}
    ).then(popover => popover.present());


	}

	removeAssessmentFromPage(assessmentId){
		var newArr = JSON.parse(JSON.stringify(this.assessments));
		var assessmentIndex = newArr.findIndex(a => a.id == assessmentId);
		newArr.splice(assessmentIndex, 1);
		this.assessments = newArr;
	}

}
