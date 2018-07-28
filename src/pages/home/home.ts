import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { QuestionsPage } from '../questions/questions';
import { ReviewPage } from '../review/review';
import { DashboardPage } from '../dashboard/dashboard';

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
}