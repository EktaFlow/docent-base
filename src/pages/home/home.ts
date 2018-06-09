import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Page_2Page } from '../page-2/page-2';

import { AcronymsPage } from '../acronyms/acronyms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  acronymsPage = AcronymsPage;

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