import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController} from '@ionic/angular'
import { AuthService } from "../auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import { HomePage } from '../home/home.page';
import { ReviewPage } from '../review/review.page';
import { DashboardPage } from '../dashboard/dashboard.page';
import { NavigatePage } from '../navigate/navigate.page';
// import { NotapplicablePage } from '../../app/notapplicable/notapplicable';
import { ActionItemsPage } from '../action-items/action-items.page';
import { QuestionsPage } from "../questions/questions.page";
import { UserDashboardPage } from "../user-dashboard/user-dashboard.page";
import { DefinitionsPage } from '../definitions/definitions.page';
import { FaqsPage } from '../faqs/faqs.page';
import { CriteriaPage } from '../criteria/criteria.page';
import { SettingsPage } from '../settings/settings.page';
import { AcronymsPage } from '../acronyms/acronyms.page';
import { SummaryPage } from '../summary/summary.page';
import { RiskReportPage } from '../risk-report/risk-report.page';

@Component({
  selector: 'mobile-nav-popover',
  templateUrl: './mobile-nav-popover.component.html',
  styleUrls: ['./mobile-nav-popover.component.scss'],
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
    // private activatedRoute: ActivatedRoute
  ) {
    this.assessmentId = activatedRoute.snapshot.paramMap.get('assessmentId');
    	this.userName = activatedRoute.snapshot.paramMap.get('userName');
    if (activatedRoute.snapshot.paramMap.get('noSecondBar')){
    this.noSecondBar = activatedRoute.snapshot.paramMap.get('noSecondBar');
    }
    console.log(this.noSecondBar);
    console.log(this.assessmentId);
    console.log(this.userName);
   }

   ngOnInit(){

   }

   goBack(){
     if (this.helpShow == true) { this.closeHelp(); }
     else if (this.assessmentShow == true) { this.closeAssessment();}
   }

   showHelp() {
     this.helpShow = true;
     this.regularNavShow = false;
   }

   closeHelp(){
     this.helpShow = false;
     this.regularNavShow = true;
   }

   showAssessment(){
     this.assessmentShow = true;
     console.log(this.assessmentShow)
     this.regularNavShow = false;
   }

   closeAssessment(){
     this.assessmentShow = false;
     this.regularNavShow = true;
   }

   closeNav(){
     this.popOver.dismiss();
   }

   ///ROUTING FUNCTIONS
   handleLogout(){
     this.auth.logout();
     // this.navCtrl.setRoot(HomePage);
     // this.navCtrl.popToRoot();
     this.router.navigate(["/user-dashboard"]);
   }

   handleUserDash = () => 	this.router.navigate(["/user-dashboard", {assessmentId: this.assessmentId}]);
   handleContinue = () => this.router.navigate(["/questions", {assessmentId: this.assessmentId}]);
   handleStartNew = () => this.router.navigate(["/startNew"]);
   handleDashboard = () => this.router.navigate(["/dashboard", {assessmentId: this.assessmentId}]);
   //expandAllFromQs = true & autoFilter = true vvvv
   handleNavigate = () => this.router.navigate(["/navigate", {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true}]);
   handleReview = () => this.router.navigate(["/review", {assessmentId: this.assessmentId}]);
   handleActionItems = () => this.router.navigate(["/action-items", {assessmentId: this.assessmentId}]);
   // handleNA = () => this.navCtrl.push(NotapplicablePage, {assessmentId: this.assessmentId});
   handleCriteria = () => this.router.navigate(["/critieria", {assessmentId: this.assessmentId}]);
   handleDefinitions = () => this.router.navigate(["/definitions", {assessmentId: this.assessmentId}]);
   handleFaqs = () => this.router.navigate(["/faqs", {assessmentId: this.assessmentId}]);
   handleSettings = () => this.router.navigate(["/settings", {assessmentId: this.assessmentId}]);
   handleSummary = () => this.router.navigate(["/summary", {assessmentId: this.assessmentId}]);
   handleAcronyms = () => this.router.navigate(["/acronyms", {assessmentId: this.assessmentId}]);
   goToDoD = () => window.location.href = "http://dodmrl.com";
   goToDeskbook = () => window.location.href = "http://www.dodmrl.com/MRL_Deskbook_2017.pdf"
   handleRiskReport = () => this.router.navigate(["/risk-report", {assessmentId: this.assessmentId}]);
   // handleAcronyms = () => this.navCtrl.push(AcronymsPage, {assessmentId: this.assessmentId});


}
