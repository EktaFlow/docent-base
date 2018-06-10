import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AcronymsPage } from '../acronyms/acronyms';
import { DefinitionsPage } from '../definitions/definitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  acronymsPage = AcronymsPage;
  definitionsPage = DefinitionsPage;

  constructor(public navCtrl: NavController) {

  }

}
