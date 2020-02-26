import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { AcronymsPage } from '../../pages/acronyms/acronyms';
import { DefinitionsPage } from '../../pages/definitions/definitions';
import { FaqsPage } from '../../pages/faqs/faqs';
import { CriteriaPage } from '../../pages/criteria/criteria';

/**
 * Generated class for the HelpmenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'helpmenu',
  templateUrl: 'helpmenu.html'
})
export class HelpmenuComponent {

  public assessmentId: any;


  constructor( public navCtrl: NavController,
      public navParams: 		 NavParams,
			   public viewCtrl: ViewController) {
           this.assessmentId = navParams.data.assessmentId;

          }

  close() {
	this.viewCtrl.dismiss();
  }
  handleCriteria(){
    this.navCtrl.push(CriteriaPage, {assessmentId: this.assessmentId});
    this.close();
  }
  handleDefinitions(){
    this.navCtrl.push(DefinitionsPage, {assessmentId: this.assessmentId});
    this.close();
  }
  handleAcronyms(){
    this.navCtrl.push(AcronymsPage, {assessmentId: this.assessmentId});
    this.close();
  }
  handleFAQ(){
    this.navCtrl.push(FaqsPage, {assessmentId: this.assessmentId});
    this.close();
  }



}
