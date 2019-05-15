import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController} from 'ionic-angular'
import { AuthService } from "../../services/auth.service";

import { HomePage } from '../../pages/home/home';
import { ReviewPage } from '../../pages/review/review';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { NavigatePage } from '../../pages/navigate/navigate';
import { NotapplicablePage } from '../../pages/notapplicable/notapplicable';
import { ActionitemsPage } from '../../pages/actionitems/actionitems';
import { QuestionsPage } from "../../pages/questions/questions";
import { UserDashboardPage } from "../../pages/user-dashboard/user-dashboard";
import { DefinitionsPage } from '../../pages/definitions/definitions';
import { FaqsPage } from '../../pages/faqs/faqs';
import { CriteriaPage } from '../../pages/criteria/criteria';
import { SettingsPage } from '../../pages/settings/settings';
import { AcronymsPage } from '../../pages/acronyms/acronyms';
import { SummaryPage } from '../../pages/summary/summary';
import { RiskReportPage } from '../../pages/risk-report/risk-report';
import { LoginPage } from '../../pages/login/login';




/**
 * Generated class for the MobileNavPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mobile-nav-popover',
  templateUrl: 'mobile-nav-popover.html'
})
export class MobileNavPopoverComponent {

  text: string;
  regularNavShow: boolean = true;
  helpShow: boolean = false;
  assessmentId: any;
  assessmentShow: boolean = false;
  userName: any;
  noSecondBar: boolean = false;


  constructor(public navCtrl: NavController,
                    public navParams: NavParams,
                    public viewCtrl: ViewController,
                    public auth: AuthService) {
    this.assessmentId = navParams.data.assessmentId;
    this.userName = navParams.data.userName;
    if (navParams.data.noSecondBar){
      this.noSecondBar = navParams.data.noSecondBar;
    }

    console.log(this.noSecondBar);
    console.log(this.assessmentId);
    console.log(this.userName);
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
    this.viewCtrl.dismiss();
  }

  async nuke(page, data = {}) {
    console.log(this.navCtrl.getViews());
    console.log(this.navCtrl.getActive().index);
    var index = this.navCtrl.getActive().index;
    this.navCtrl.remove(0, index);
    console.log(this.navCtrl.getViews());

    this.closeNav();

    this.navCtrl.push(page, data);
      
  }

  ///ROUTING FUNCTIONS
  handleLogout(){
    this.viewCtrl.dismiss();
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  handleUserDash = () => {
    this.nuke(UserDashboardPage, {assessmentId: this.assessmentId});
  }

  handleContinue = async () => { 
    this.nuke(QuestionsPage, {assessmentId: this.assessmentId}); 
  }

  handleStartNew = () => { this.nuke(HomePage); }
  handleDashboard = () => { this.nuke(DashboardPage, {assessmentId: this.assessmentId}); }
  handleNavigate = () => { this.nuke(NavigatePage, {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true});}
  handleReview = () => {  this.nuke(ReviewPage, {assessmentId: this.assessmentId}); }
  handleActionItems = () => {   this.nuke(ActionitemsPage, {assessmentId: this.assessmentId});}
  handleNA = () => {  this.nuke(NotapplicablePage, {assessmentId: this.assessmentId});}
  handleCriteria = () => {  this.nuke(CriteriaPage, {assessmentId: this.assessmentId});}
  handleDefinitions = () => {  this.nuke(DefinitionsPage, {assessmentId: this.assessmentId});}
  handleFaqs = () => {  this.nuke(FaqsPage, {assessmentId: this.assessmentId});}
  handleSettings = () => {  this.nuke(SettingsPage, {assessmentId: this.assessmentId});}
  handleSummary = () => {  this.nuke(SummaryPage, {assessmentId: this.assessmentId});}
  handleAcronyms = () => {  this.nuke(AcronymsPage, {assessmentId: this.assessmentId});}
  goToDoD = () => window.location.href = "http://dodmrl.com";
  goToDeskbook = () => window.location.href = "http://www.dodmrl.com/MRL_Deskbook_2017.pdf"
  handleRiskReport = () => { this.nuke(RiskReportPage, {assessmentId: this.assessmentId});}
  // handleAcronyms = () => this.navCtrl.push(AcronymsPage, {assessmentId: this.assessmentId});

}
