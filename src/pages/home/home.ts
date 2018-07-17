import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { QuestionsPage } from '../questions/questions';

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

  targetMRLSelect(val){
    console.log(val)
  }

  page_2(targetMRL){
    console.log(targetMRL);
    this.navCtrl.push(QuestionsPage,{
      data: targetMRL
    });
  }
}