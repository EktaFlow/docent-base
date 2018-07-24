import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { QuestionsPage } from '../questions/questions';
import { RegisterPage } from "../register/register";
import { LoginPage }    from "../login/login";

import { AcronymsPage } from '../acronyms/acronyms';
import { DefinitionsPage } from '../definitions/definitions';
import { HelpmenuComponent } from '../../components/helpmenu/helpmenu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  acronymsPage = AcronymsPage;
  definitionsPage = DefinitionsPage;
	registerPage = RegisterPage;
	loginPage    = LoginPage;

  members = [];

  constructor(public navCtrl: NavController,
              public popOver: PopoverController) {}

	showPopover(myEvent) {
	var popoverClick = this.popOver.create(HelpmenuComponent, {}, {cssClass: 'help-menu'});
		popoverClick.present({
			ev: myEvent
		});
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

	// Navs

	registerNav() { this.navCtrl.push( this.registerPage ); }
	loginNav() { this.navCtrl.push( this.loginPage ); }

  page_2(targetMRL){
    console.log(targetMRL);
    this.navCtrl.push(QuestionsPage,{
      data: targetMRL
    });
  }
}
