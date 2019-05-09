import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { AcronymPopoverComponent } from '../../components/acronym-popover/acronym-popover';
import {isElectron} from "../../services/constants";

@IonicPage()
@Component({
  selector: 'page-acronyms',
  templateUrl: 'acronyms.html',
})
export class AcronymsPage {
        mainTitle: String;
        assessmentId: any;
				noSecondBar: boolean = false;
        pageName: any = "Acronyms";
        isElectron: any;
        inAssessment: any;
        private acronyms: any = {};
        private acronymsKeys: any = [];


    constructor(public navCtrl: NavController,
			public navParams: NavParams,
			public http: HttpClient,
      public popOver: PopoverController) {

            this.mainTitle = "Acronyms";
						this.assessmentId = navParams.data.assessmentId;

    }

    ngOnInit() {
      this.mainTitle = "Acronyms";
      this.isElectron = isElectron;
      if (!this.isElectron){
        this.getAcronyms();
      	console.log(this.acronyms);
      } else {
        this.getAcronyms();
        var myStorage = window.localStorage;
        if (myStorage.getItem('inAssessment') == "true"){
          this.inAssessment = true;
        //  this.getAcronyms();
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
    this.popOver.create(AcronymPopoverComponent, {fullText: fullText}, {cssClass: 'acro-popup'})
    .present({
      ev: event
    });
  }








  
}
