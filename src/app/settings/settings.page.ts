import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from '@ionic/angular';
import { TopbarComponent } from "./topbar/topbar";
//import {saveAs} from 'file-saver/FileSaver';
import { HttpClient } from '@angular/common/http';
import { saveAs } from "file-saver/FileSaver";
import {JsonUploadPopoverComponent} from "./json-upload-popover/json-upload-popover";
import { GoogleAnalytics } from './helpers/GoogleAnalytics';
import { RouterModule} from "@angular/router";



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl: NavController,
	            private popoverController: PopoverController,
                    public navParams: NavParams,
                    private http: HttpClient,
                  public popover: PopoverController,
                public router: RouterModule ) {
                      this.user = navParams.data.user;
                      console.log(navParams.data.user);

  }

  downloadJsonHref: any;
  files: any;
  user: any;
  pageName: any = "Settings";

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("settings");
  }

  // goBackToUser(){
  //   this.router.navigate(["/user", {assessmentId: this.assessmentId}]);
  //
  // };

  async saveDownJSON(){
  		this.http.get('assets/json/pretty_2017.json')
  					.subscribe( data => {
  						console.log(data);
              //get data and then save down file
              var json = JSON.stringify(data, null, '\t');
              saveAs(new Blob([json], { type: "text/plain" }), "2017.json");
  					});
  }

  // generateDownloadJsonUri(json) {
  //   var theJSON = JSON.stringify(json);
  //   var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  //   return this.downloadJsonHref = uri;
  // }

  showFileUpload() {

			let myEmitter = new EventEmitter<any>();
				myEmitter.subscribe( v =>  {
				this.files.push(v);
        console.log(this.files);
			});

			this.popover
				.create(JsonUploadPopoverComponent,
					{
						emitter: myEmitter
					},
					{	cssClass: "json-upload-popover"})
				.then(popover => popover.present());

        console.log("emitter");
	}

}
