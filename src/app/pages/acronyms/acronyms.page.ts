import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '../../services/helpers/GoogleAnalytics';
import { AcronymPopoverComponent } from '../../components/acronym-popover/acronym-popover.component';
import { ActivatedRoute } from  "@angular/router"
import {isElectron} from "../../services/constants"

@Component({
  selector: 'acronyms',
  templateUrl: './acronyms.page.html',
  styleUrls: ['./acronyms.page.scss'],
})
export class AcronymsPage implements OnInit {
  //vars
  mainTitle: String;
  assessmentId: any;
  noSecondBar: boolean = false;
  pageName: any = "Acronyms";
  private acronyms: any = {};
  private acronymsKeys: any = [];
  isElectron: any;
  inAssessment: any;


constructor(
  public http: HttpClient,
  public popOver: PopoverController,
  public activatedRoute: ActivatedRoute
) {
        this.mainTitle = "Acronyms";
        this.assessmentId = this.activatedRoute.snapshot.paramMap.get('assessmentId');
}

ngOnInit() {
  this.mainTitle = "Acronyms";
  this.getAcronyms();
  console.log(this.acronyms);
  this.isElectron = isElectron;
  if (this.isElectron){
    var myStorage = window.localStorage;
    if (myStorage.getItem('inAssessment') == 'true') {
      this.inAssessment = true;
    }
  }
}

ionViewWillEnter() {
GoogleAnalytics.trackPage("acronyms");
}

getAcronyms() {
this.http.get('assets/json/acronyms.json')
      .subscribe( data => {
        console.log(data);
        this.acronyms = data;
        this.acronymsKeys = Object.keys(data);
      });
}



presentFullAcronym(fullText, event){
  this.popOver.create({
    component: AcronymPopoverComponent,
    event: event,
    componentProps: {
      fullText: fullText,
    },
    cssClass: 'acro-popup'
  })
  .then(
    popover => popover.present()
  );
}




}
