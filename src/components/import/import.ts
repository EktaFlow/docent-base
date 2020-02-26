import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuestionsPage } from "../../pages/questions/questions";
import {AuthService} from "../../services/auth.service";
import { AuthUrl } from "../../services/constants";
import { AssessmentService } from '../../services/assessment.service';



import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var load = gql`
mutation importAssessment($import: String, $userId: String, $userEmail: String) {
	importAssessment(import: $import, userId: $userId, userEmail: $userEmail) {
		_id
	}
}
`

@Component({
  selector: 'import',
  templateUrl: 'import.html'
})
export class ImportComponent {

  text: string;
	file: any;

  constructor(private viewController: ViewController, private assessmentService: AssessmentService, private apollo: Apollo, public navController: NavController, private auth: AuthService) {
    console.log('Hello ImportComponent Component');
  }

	async uploadFile(event) {
		var file = (<HTMLInputElement>document.getElementById("qwerty")).files[0];
		var reader = new FileReader();
		reader.onload = (e) => {
		var text = (<any>e.target).result;
			this.loadAssessment(text);

			// document.getElementById("inputTextToSave").value = text;
		};

		var cool = reader.readAsText(file, "UTF-8")
													 //		var assessmentObject = JSON.parse(cool);
													 // 		console.log(assessmentObject);
	}

	async loadAssessment(assessment) {
		var user = await this.auth.currentUser();
		console.log(user);
		await this.apollo.mutate({
			mutation: load,
			variables: {
				import: assessment,
				userId: user._id,
				userEmail: user.email
			}
		}).subscribe( data => {
				console.log(data.data.importAssessment._id);
				this.assessmentService.setCurrentAssessmentId(data.data.importAssessment._id)
				this.viewController.dismiss();
				this.navController.push(QuestionsPage, { data: data.data.importAssessment._id })
			})

	}

	test(e) {
		var file = e.target.files[0];

		var fileObject = {
			size: file.size,
			name: file.name,
			lastModified: file.lastModifiedDate
		}

		this.file = fileObject;
		}

}
