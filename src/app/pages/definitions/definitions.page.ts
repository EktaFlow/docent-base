import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '../../services/helpers/GoogleAnalytics';
import {Router, ActivatedRoute} from "@angular/router";
import {isElectron} from '../../services/constants'


@Component({
  selector: 'definitions',
  templateUrl: './definitions.page.html',
  styleUrls: ['./definitions.page.scss'],
})
export class DefinitionsPage implements OnInit {

    mainTitle: String;
    assessmentId: any;
    noSecondBar: boolean = false;
    pageName: any = "Definitions";
    isElectron: any;
    inAssessment: any;


  constructor(
  public http: HttpClient,
  private activatedRoute: ActivatedRoute) {
      this.assessmentId = activatedRoute.snapshot.paramMap.get('assessmentId');
    }

private definitions: any = [];

ngOnInit() {
this.mainTitle = "Definitions";
this.getDefinitions();
this.isElectron = isElectron;
if (this.isElectron){
  var myStorage = window.localStorage;
  if (myStorage.getItem('inAssessment') == 'true') {
    this.inAssessment = true;
  }
}
}

getDefinitions() {
this.http.get('assets/json/definitions.json')
        .subscribe(data => {
          this.definitions = data;
        });
}


ionViewWillEnter() {
GoogleAnalytics.trackPage("definitions");
}



}
