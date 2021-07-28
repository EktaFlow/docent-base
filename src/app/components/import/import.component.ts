import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { AssessmentService } from "../../services/assessment.service";
import { Router } from "@angular/router";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var load = gql`
  mutation importAssessment(
    $import: String
    $userId: String
    $userEmail: String
  ) {
    importAssessment(import: $import, userId: $userId, userEmail: $userEmail) {
      _id
    }
  }
`;

@Component({
  selector: "import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.scss"],
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
  ) {}

  ngOnInit() {}

  async uploadFile(event) {
    var file = (<HTMLInputElement>document.getElementById("qwerty")).files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      var text = (<any>e.target).result;
      this.loadAssessment(text);

      // document.getElementById("inputTextToSave").value = text;
    };

    var cool = reader.readAsText(file, "UTF-8");
    //		var assessmentObject = JSON.parse(cool);
  }

  async loadAssessment(loadedAssessment) {
    var user = await this.auth.currentUser();
    var added = {};
    if ("assessment" in JSON.parse(loadedAssessment)){
      added = loadedAssessment
    } else {
      added = {
        "assessment": JSON.parse(loadedAssessment)
      }
      added = JSON.stringify(added)

    }
    await this.apollo
      .mutate({
        mutation: load,
        variables: {
          import: added,
          userId: user._id,
          userEmail: user.email,
        },
      })
      .subscribe((data) => {
        // this.assessmentService.setCurrentAssessmentId(data.data.importAssessment._id)
        this.popOver.dismiss();
        // this.router.navigate(["/questions", {data: data.data.importAssessment._id}]);
      });
  }

  test(e) {
    var file = e.target.files[0];

    var fileObject = {
      size: file.size,
      name: file.name,
      lastModified: file.lastModifiedDate,
    };

    this.file = fileObject;
  }
}
