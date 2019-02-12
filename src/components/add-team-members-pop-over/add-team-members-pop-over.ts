 import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AssessmentService } from "../../services/assessment.service";
import { HttpClient } from '@angular/common/http';
import { AuthUrl } from "../../services/constants";





/**
 * Generated class for the AddTeamMembersPopOverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-team-members-pop-over',
  templateUrl: 'add-team-members-pop-over.html'
})
export class AddTeamMembersPopOverComponent {


  public newMember: any = {};
  assessmentId: any;

  constructor(public navCtrl: NavController,
                    public navParams: NavParams,
                  public assessmentService: AssessmentService,
									public http: HttpClient) {
    this.assessmentId = navParams.data.assessmentId;
  }

  async addNewMember() {
    //access assessment
    //add team member to assessment
		var updateTM = {
			"name" : this.newMember.name,
			"email" : this.newMember.email,
			"role" : this.newMember.role

		}
		console.log(this.assessmentId);

    var obser = await this.assessmentService.updateTeamMembers(this.assessmentId, updateTM);
		obser.subscribe(b => {
			console.log(b);
			this.sendEmailsToTeamMember(this.assessmentId);
		});

		//not currently auto syncing with page *ajaxing* for now it is fine.....

  }

  async sendEmailsToTeamMember(assessmentId) {
		var teamMember = [this.newMember.email];

		var url = AuthUrl + "share";

	// this makes sense in auth b/c we probably do want some user checking here, right?
		fetch(url, {
			method: "POST",
			headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
				},
			body: JSON.stringify({
				recipients: teamMember,
				assessmentId
			})
		})
		.then(a => console.log("okok"))
		.catch(e => console.error(e));
	}



}
