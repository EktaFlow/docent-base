import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { Page_2Page } from '../page-2/page-2';
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

  members = [];

  constructor(public navCtrl: NavController,public popOver: PopoverController) {

  }

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
  page_2(targetMRL){
    this.navCtrl.push(Page_2Page,{
      data: targetMRL
    });
  }
}