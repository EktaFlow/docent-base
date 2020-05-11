import { NgModule, Component, OnInit, EventEmitter } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import {JsonUploadPopoverComponent} from "../../components/json-upload-popover/json-upload-popover.component";
//import {saveAs} from 'file-saver/FileSaver';
import { HttpClient } from '@angular/common/http';
import { saveAs } from "file-saver/FileSaver";
import { GoogleAnalytics } from '../../services/helpers/GoogleAnalytics';
import { Router} from "@angular/router";



@NgModule()
@Component({
  selector: 'settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
                    private http: HttpClient,
                  public popover: PopoverController,
                public router: Router ) {

  }

  downloadJsonHref: any;
  files: any;
  user: any;
  pageName: any = "Settings";

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("settings");
  }

  ngOnInit(){

  }
  goBackToUser(){ this.router.navigate(["/user-dashboard"]);};

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

        this.popover.create({
          component: JsonUploadPopoverComponent,
          componentProps: {
            emitter: myEmitter,
          },
          cssClass: "json-upload-popover"
        }).then(popover => popover.present());

        console.log("emitter");
	}

}
