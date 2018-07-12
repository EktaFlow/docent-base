import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { ReviewPage } from '../review/review';
import { Page_3Page } from '../page-3/page-3';

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
  actionPerson=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl:PopoverController) {
    let targetMRL = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page_2Page');
  }

  addPerson(personIn){
    console.log(personIn)
    this.actionPerson.push(personIn);
  }

  removePerson(){
    this.actionPerson.pop();
  }

  pageSelect(event){
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: event
     });
  }
  back(){
    this.navCtrl.pop();
  }
  next(){
    this.navCtrl.push(Page_3Page);
  }
}
