import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "faqs",
  templateUrl: "./faqs.page.html",
  styleUrls: ["./faqs.page.scss"],
})
export class FaqsPage implements OnInit {
  mainTitle: String;
  assessmentId: any;
  noSecondBar: boolean = false;
  pageName: any = "Faqs";
  currentQ: any = "";
  private faqInfoStandalone: any;
  private faqInfoWeb: any;
  private faqInfoIOS: any;
  private faqInfoAndroid: any;
  private feedbackContacts: any;

  constructor(public http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.mainTitle = "Frequently Asked Questions";
    this.assessmentId = activatedRoute.snapshot.paramMap.get("assessmentId");
  }

  getFaqInfo() {
    this.http.get("assets/json/faq.json").subscribe((data) => {
      this.faqInfoStandalone = this.filterAppType("standalone", data);
    });
  }

  getFeedbackContacts() {
    this.http
      .get("assets/json/feedback_contacts.json")
      .subscribe((data) => (this.feedbackContacts = data));
  }

  // Each type of app will have a different set of FAQ questions
  filterAppType(type, arr) {
    return arr.filter(
      (object) => object.help_type == type || !object.help_type
    );
  }

  ionViewDidLoad() {
    this.getFaqInfo();
    this.getFeedbackContacts();
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("faqs");
  }

  toggleFaq(help_title) {
    if (this.currentQ == "" || help_title != "") {
      this.currentQ = help_title;
    } else if (help_title == "") {
      this.currentQ = "";
    }
  }

  ngOnInit() {
    this.mainTitle = "Frequently Asked Questions";
  }
}
