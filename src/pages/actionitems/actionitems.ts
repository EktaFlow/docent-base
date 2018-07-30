import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ActionitemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actionitems',
  templateUrl: 'actionitems.html',
})
export class ActionitemsPage {

  schema = [
    {
      header:"Cost & Funding",
      subheader:"Production Cost Knowledge (Cost modeling)",
      mrl:"3",
      question:"Have initial cost targets and risks been identified?",
      reason:"This",
      action:"is",
      assumptions:"an",
      notes:"example",
      risks:"of",
      teamMembers:"the",
      attatchments:"schema"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionitemsPage');
  }

}
