import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import {saveAs} from 'file-saver/FileSaver';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser/'
import {JsonUploadPopoverComponent} from "../../components/json-upload-popover/json-upload-popover";




// import { UserDashboardPage } from "../user-dashboard/user-dashboard";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
                    public navParams: NavParams,
                    private http: HttpClient,
                    public sanitizer: DomSanitizer,
                  public popover: PopoverController ) {
                      this.user = navParams.data.user;
                      console.log(navParams.data.user);

  }

  downloadJsonHref: any;
  files: any;
  user: any;

  goBackToUser(){ this.navCtrl.pop()};

  // async saveDownJSON(){
  // 		this.http.get('assets/json/2016.json')
  // 					.subscribe( data => {
  // 						console.log(data);
  //             this.generateDownloadJsonUri(data);
  //             return this.downloadJsonHref;
  // 					});
  // }

  generateDownloadJsonUri(json) {
    var theJSON = JSON.stringify(json);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    return this.downloadJsonHref = uri;
  }

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
				.present();

        console.log("emitter");
	}






}
