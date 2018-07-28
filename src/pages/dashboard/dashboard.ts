import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  questionSet = [
    {
      header:"Technology Maturity",
      questions:[
        {
          subheader:"Technology Maturity",
          answers:[true,false,null,true,false,null,true,false,null,true],
        }
      ]
    },
    {
      header:"Technology Maturity & Industrial Base",
      questions:[
        {
          subheader:"Industrial Base",
          answers:[true,false,null,true,false,null,true,false,null,false],
        },
        {
          subheader:"Manfufacturing Technology Development",
          answers:[false,null,true,false,null,true,false,null,true,null],
        }
      ]
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
