import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewsComponent } from '../../components/views/views';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public popOver: PopoverController) {
  }

  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }

}
