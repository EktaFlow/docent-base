import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
//import {saveAs} from 'file-saver/FileSaver';
import { HttpClient } from '@angular/common/http';
import { saveAs } from "file-saver/FileSaver";
import {JsonUploadPopoverComponent} from "../../components/json-upload-popover/json-upload-popover";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { AuthService } from "../../services/auth.service";








@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  // public popoverController: PopoverController

  constructor(public navCtrl: NavController,
	                private popoverController: PopoverController,
                  public navParams: NavParams,
                  private http: HttpClient,
                  public popover: PopoverController,
                  private auth: AuthService ) {
                      // this.user = navParams.data.user;
                      // console.log(navParams.data.user);

  }

  downloadJsonHref: any;
  files: any = [];
  currentUser: any;
  pageName: any = "Settings";
  userFiles: any = [];

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("settings");
  }

  async ngOnInit(){
    this.currentUser = await this.auth.currentUser();
    for (let file of this.currentUser.jsonFiles){
			var currentFile = JSON.parse(file);
      console.log(currentFile);
      console.log(currentFile.fileName);
			this.userFiles.push(currentFile.fileName);
		}
    console.log(this.userFiles);

  }

  // deleteFile(file){
  //   for (let jsonFile of this.currentUser.jsonFiles){
  //     if (file == JSON.parse(jsonFile).fileName){
  //
  //     }
  //   }
  // }



  goBackToUser(){ this.navCtrl.pop()};

  async saveDownJSON(){
  		this.http.get('assets/json/2016.json')
  					.subscribe( data => {
  						console.log(data);
              //get data and then save down file
              var json = JSON.stringify(data);
              saveAs(new Blob([json], { type: "text/plain" }), "2016.json");
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
        this.userFiles.push(v.fileName);
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
