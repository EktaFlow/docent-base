import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { ViewsComponent } from '../../components/views/views';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public popOver: PopoverController) {
  }

  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }
}
