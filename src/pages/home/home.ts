import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Page_2Page } from '../page-2/page-2';

import { AcronymsPage } from '../acronyms/acronyms';
import { DefinitionsPage } from '../definitions/definitions';
import { HelpmenuComponent } from '../../components/helpmenu/helpmenu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  acronymsPage = AcronymsPage;
  definitionsPage = DefinitionsPage;

  constructor(public navCtrl: NavController,
              public popOver: PopoverController) {}

	showPopover(myEvent) {
	var popoverClick = this.popOver.create(HelpmenuComponent, {}, {cssClass: 'help-menu'});
		popoverClick.present({
			ev: myEvent
		});
	}	

  addMember(){

  }
  removeMember(){

  }
  page_2(){
    this.navCtrl.push(Page_2Page);
  }
}
