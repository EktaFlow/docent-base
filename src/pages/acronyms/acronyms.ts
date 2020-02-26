import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { AcronymPopoverComponent } from '../../components/acronym-popover/acronym-popover';



/**
 * Generated class for the AcronymsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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


    constructor(public navCtrl: NavController,
			public navParams: NavParams,
			public http: HttpClient,
      public popOver: PopoverController) {

            this.mainTitle = "Acronyms";
						this.assessmentId = navParams.data.assessmentId;

    }

	private acronyms: any = {};
	private acronymsKeys: any = [];

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad AcronymsPage');
	this.getAcronyms();
	console.log(this.acronyms);
  }

  ngOnInit() {
    this.mainTitle = "Acronyms";
  }
}
