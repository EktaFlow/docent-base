import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular'
import { NavController, NavParams } from '@ionic/angular';

import { AcronymsPage } from '../acronyms/acronyms.page';
import { DefinitionsPage } from '../definitions/definitions.page';
import { FaqsPage } from '../faqs/faqs.page';
import { CriteriaPage } from '../criteria/criteria.page';
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
  	public popOver: PopoverController,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assessmentId = activatedRoute.snapshot.paramMap.get('assessmentId');
  }

  ngOnInit(){}

  close() {
	this.popOver.dismiss();
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
