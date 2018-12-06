import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuestionsPage } from "../../pages/questions/questions";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var load = gql`
mutation importAssessment($import: String) {
	importAssessment(import: $import) {
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

  constructor( private apollo: Apollo, public navController: NavController) {
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

	loadAssessment(assessment) {
	this.apollo.mutate({
		//this was mutation: load - but the only "importing" mutation in the back was called importAssessment
		mutation: importAssessment,
		variables: {
			import: assessment
		}
		}).subscribe( data => {
				console.log(data.data.importAssessment._id);
				this.navController.push(QuestionsPage, { data: data.data.importAssessment._id })})

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
