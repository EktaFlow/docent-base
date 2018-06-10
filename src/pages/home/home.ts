import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

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



}
