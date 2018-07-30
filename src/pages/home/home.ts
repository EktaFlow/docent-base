import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { QuestionsPage } from '../questions/questions';
import { ReviewPage } from '../review/review';
import { DashboardPage } from '../dashboard/dashboard';
import { NavigatePage } from '../navigate/navigate';
import { NotapplicablePage } from '../notapplicable/notapplicable';
import { SkippedquestionsPage } from '../skippedquestions/skippedquestions';
import { ActionitemsPage } from '../actionitems/actionitems';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  members = [];

  constructor(public navCtrl: NavController,public popOver: PopoverController) {

  }	
  
  addMember(nameIn:string,roleIn:string){
    var newMember = {name: nameIn, role: roleIn};
    this.members.push(newMember);
  }
  removeMember(){
    this.members.pop()
  }

  questions(date,val,loc){
    this.navCtrl.push(QuestionsPage,{
      mrl: val,
      date: date,
      location: loc
    });
  }
  
  review(){
    this.navCtrl.push(ReviewPage);
  }

  dashboard(){
    this.navCtrl.push(DashboardPage);
  }

  navigate(){
    this.navCtrl.push(NavigatePage)
  }

  na(){
    this.navCtrl.push(NotapplicablePage);
  }

  skipped(){
    this.navCtrl.push(SkippedquestionsPage);
  }

  action(){
    this.navCtrl.push(ActionitemsPage);
  }
}