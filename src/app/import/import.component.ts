import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { QuestionsPage } from "../../app/questions/questions.page";
import {AuthService} from "../auth.service";
import { AuthUrl } from "../constants";
import { AssessmentService } from '../assessment.service';
import {Router, ActivatedRoute} from "@angular/router";

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
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  //vars
  text: string;
	file: any;

  constructor(
    private popOver: PopoverController,
    private assessmentService: AssessmentService,
    private apollo: Apollo,
    public navController: NavController,
    private auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(){}

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
        this.popOver.dismiss();
        // this.navController.push(QuestionsPage, { data: data.data.importAssessment._id })
        this.router.navigate(["/questions", {data: data.data.importAssessment._id}]);
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
