import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { NavController } from 'ionic-angular';

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

  acronymsPage = AcronymsPage;
  definitionsPage = DefinitionsPage;
	faqsPage = FaqsPage;
  criteriaPage = CriteriaPage;

  constructor( public navCtrl: NavController,
			   public viewCtrl: ViewController) {
  }

  close() {
	this.viewCtrl.dismiss();
  }

}
