import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Page_2Page } from '../page-2/page-2';

import { AcronymsPage } from '../acronyms/acronyms';
import { DefinitionsPage } from '../definitions/definitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  acronymsPage = AcronymsPage;
  definitionsPage = DefinitionsPage;

  constructor(public navCtrl: NavController,public popCtrl: PopoverController) {

  }
  addMember(){

  }
  removeMember(){

  }
  page_2(){
    this.navCtrl.push(Page_2Page);
  }
}