import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AcronymsPage } from '../acronyms/acronyms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  acronymsPage = AcronymsPage;

  constructor(public navCtrl: NavController) {

  }

}
