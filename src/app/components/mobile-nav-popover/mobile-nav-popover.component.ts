import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, PopoverController } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "mobile-nav-popover",
  templateUrl: "./mobile-nav-popover.component.html",
  styleUrls: ["./mobile-nav-popover.component.scss"],
})
export class MobileNavPopoverComponent implements OnInit {
  //vars
  text: string;
  regularNavShow: boolean = true;
  helpShow: boolean = false;
  assessmentId: any;
  assessmentShow: boolean = false;
  userName: any;
  noSecondBar: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popOver: PopoverController,
    public auth: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assessmentId = activatedRoute.snapshot.paramMap.get("assessmentId");
    this.userName = activatedRoute.snapshot.paramMap.get("userName");
    if (activatedRoute.snapshot.paramMap.get("noSecondBar")) {
      this.noSecondBar = activatedRoute.snapshot.paramMap.get("noSecondBar");
    }
  }

  ngOnInit() {}

  goBack() {
    if (this.helpShow == true) {
      this.closeHelp();
    } else if (this.assessmentShow == true) {
      this.closeAssessment();
    }
  }

  showHelp() {
    this.helpShow = true;
    this.regularNavShow = false;
  }

  closeHelp() {
    this.helpShow = false;
    this.regularNavShow = true;
  }

  showAssessment() {
    this.assessmentShow = true;
    this.regularNavShow = false;
  }

  closeAssessment() {
    this.assessmentShow = false;
    this.regularNavShow = true;
  }

  closeNav() {
    this.popOver.dismiss();
  }

  ///ROUTING FUNCTIONS
  handleLogout() {
    this.auth.logout();
    // this.navCtrl.setRoot(HomePage);
    // this.navCtrl.popToRoot();
    this.router.navigate(["/user-dashboard"]);
  }

  handleUserDash() {
    this.router.navigate([
      "/user-dashboard",
      { assessmentId: this.assessmentId },
    ]);
    this.popOver.dismiss();
  }
  handleContinue() {
    this.router.navigate(["/questions", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  handleStartNew() {
    this.router.navigate(["/startNew"]);
    this.popOver.dismiss();
  }
  handleDashboard() {
    this.router.navigate(["/dashboard", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  handleNavigate() {
    this.router.navigate([
      "/navigate",
      {
        assessmentId: this.assessmentId,
        expandAllFromQs: true,
        autoFilter: true,
      },
    ]);
    this.popOver.dismiss();
  }
  handleReview() {
    this.router.navigate(["/review", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  handleActionItems() {
    this.router.navigate([
      "/action-items",
      { assessmentId: this.assessmentId },
    ]);
    this.popOver.dismiss();
  }
  handleCriteria() {
    if (this.assessmentId == undefined) {
      this.router.navigate(["/criteria"]);
    } else {
      this.router.navigate(["/critieria", { assessmentId: this.assessmentId }]);
    }
    this.popOver.dismiss();
  }
  handleDefinitions() {
    this.router.navigate(["/definitions", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  handleFaqs() {
    this.router.navigate(["/faqs", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  handleSettings() {
    this.router.navigate(["/settings", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  handleSummary() {
    this.router.navigate(["/summary", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  handleAcronyms() {
    this.router.navigate(["/acronyms", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
  goToDoD = () => (window.location.href = "http://dodmrl.com");
  goToDeskbook = () =>
    (window.location.href = "http://www.dodmrl.com/MRL_Deskbook_2017.pdf");
  handleRiskReport() {
    this.router.navigate(["/risk-report", { assessmentId: this.assessmentId }]);
    this.popOver.dismiss();
  }
}
