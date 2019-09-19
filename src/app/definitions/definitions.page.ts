import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '../helpers/GoogleAnalytics';


@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.page.html',
  styleUrls: ['./definitions.page.scss'],
})
export class DefinitionsPage implements OnInit {

  mainTitle: String;
    assessmentId: any;
    noSecondBar: boolean = false;
    pageName: any = "Definitions";


  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http: HttpClient) {
        this.assessmentId = activatedRoute.snapshot.paramMap.get('assessmentId');
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
