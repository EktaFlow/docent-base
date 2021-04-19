import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { AcronymPopoverComponent } from "../../components/acronym-popover/acronym-popover.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "acronyms",
  templateUrl: "./acronyms.page.html",
  styleUrls: ["./acronyms.page.scss"],
})
export class AcronymsPage implements OnInit {
  //vars
  mainTitle: String;
  assessmentId: any;
  noSecondBar: boolean = false;
  pageName: any = "Acronyms";
  private acronyms: any = {};
  private acronymsKeys: any = [];

  constructor(
    public http: HttpClient,
    public popOver: PopoverController,
    public activatedRoute: ActivatedRoute
  ) {
    this.mainTitle = "Acronyms";
    this.assessmentId = this.activatedRoute.snapshot.paramMap.get(
      "assessmentId"
    );
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("acronyms");
  }

  getAcronyms() {
    this.http.get("assets/json/acronyms.json").subscribe((data) => {
      this.acronyms = data;
      this.acronymsKeys = Object.keys(data);
    });
  }

  presentFullAcronym(fullText, event) {
    this.popOver
      .create({
        component: AcronymPopoverComponent,
        event: event,
        componentProps: {
          fullText: fullText,
        },
        cssClass: "acro-popup",
      })
      .then((popover) => popover.present());
  }

  ngOnInit() {
    this.mainTitle = "Acronyms";
    this.getAcronyms();
  }
}
