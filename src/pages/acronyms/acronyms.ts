import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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

    constructor(public navCtrl: NavController,
			public navParams: NavParams,
			public http: HttpClient) {

            this.mainTitle = "Acronyms";
    }

	private acronyms: any = {};
	private acronymsKeys: any = [];

	getAcronyms() {
		this.http.get('assets/json/acronyms.json')
					.subscribe( data => {
						console.log(data);
						this.acronyms = data;
						this.acronymsKeys = Object.keys(data);
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
