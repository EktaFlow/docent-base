import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


/**
 * Generated class for the DefinitionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-definitions',
  templateUrl: 'definitions.html',
})
export class DefinitionsPage {
        mainTitle: String;
        assessmentId: any;
        noSecondBar: boolean = false;


      constructor(public navCtrl: NavController,
			public navParams: NavParams,
			public http: HttpClient) {
            this.assessmentId = navParams.data.assessmentId;
        }

	private definitions: any = [];

	getDefinitions() {
	this.http.get('assets/json/definitions.json')
						.subscribe(data => {
							this.definitions = data;
						});
	}

  ionViewDidLoad() {
	this.getDefinitions();
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("definitions");
  }

  ngOnInit() {
    this.mainTitle = "Definitions";
  }
}
