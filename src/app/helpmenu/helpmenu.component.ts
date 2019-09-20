import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/angular'
import { NavController, NavParams, IonicPage } from '@ionic/angular';

import { AcronymsPage } from '../acronyms/acronyms';
import { DefinitionsPage } from '../definitions/definitions';
import { FaqsPage } from '../faqs/faqs';
import { CriteriaPage } from '../criteria/criteria';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-helpmenu',
  templateUrl: './helpmenu.component.html',
  styleUrls: ['./helpmenu.component.scss'],
})
export class HelpmenuComponent implements OnInit {
  //vars
  public assessmentId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: 		 NavParams,
  	public viewCtrl: ViewController,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assessmentId = activatedRoute.snapshot.paramMap.get('assessmentId');
  }

  close() {
	this.viewCtrl.dismiss();
  }
  handleCriteria(){
    this.router.navigate(["/questions", {assessmentId: this.assessmentId}]);
    // this.navCtrl.push(CriteriaPage, {assessmentId: this.assessmentId});
    this.close();
  }
  handleDefinitions(){
    this.router.navigate(["/definitions", {assessmentId: this.assessmentId}]);

    // this.navCtrl.push(DefinitionsPage, {assessmentId: this.assessmentId});
    this.close();
  }
  handleAcronyms(){
    this.router.navigate(["/acronyms", {assessmentId: this.assessmentId}]);

    // this.navCtrl.push(AcronymsPage, {assessmentId: this.assessmentId});
    this.close();
  }
  handleFAQ(){
    this.router.navigate(["/faqs", {assessmentId: this.assessmentId}]);

    // this.navCtrl.push(FaqsPage, {assessmentId: this.assessmentId});
    this.close();
  }

}
