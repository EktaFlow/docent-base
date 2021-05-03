import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "definitions",
  templateUrl: "./definitions.page.html",
  styleUrls: ["./definitions.page.scss"],
})
export class DefinitionsPage implements OnInit {
  mainTitle: String;
  assessmentId: any;
  noSecondBar: boolean = false;
  pageName: any = "Definitions";

  constructor(public http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.assessmentId = activatedRoute.snapshot.paramMap.get("assessmentId");
  }

  private definitions: any = [];

  getDefinitions() {
    this.http.get("assets/json/definitions.json").subscribe((data) => {
      this.definitions = data;
    });
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("definitions");
  }

  ngOnInit() {
    this.mainTitle = "Definitions";
    this.getDefinitions();
  }
}
