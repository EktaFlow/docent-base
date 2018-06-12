import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';

/**
 * Generated class for the Page_2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-2',
  templateUrl: 'page-2.html',
})
export class Page_2Page {

  slectorResponse = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl:PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page_2Page');
  }

  pageSelect(event){
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: event
     });
  }

}
