import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotapplicablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notapplicable',
  templateUrl: 'notapplicable.html',
})
export class NotapplicablePage {

  schema = [
    {
      header:"Technology Maturity",
      mrl:4,
      questions:[
        "Is the Technology Readiness at TRL 4 or greater?"
      ]
    },
    {
      header:"Technology & Industrial Base",
      mrl:4,
      questions:[
        "Have industrial base capabilities and gpas/risks been identified for key technologies, components, and/or key processes?",
        "Have pertinenet Manufacturing Sciene (MS) and Advanced Manufacturing Technology requirements been identified?"
      ]
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotapplicablePage');
  }

}
