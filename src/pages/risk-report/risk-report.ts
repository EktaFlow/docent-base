import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopbarComponent} from "../../components/topbar/topbar";

/**
 * Generated class for the RiskReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-risk-report',
  templateUrl: 'risk-report.html',
})
export class RiskReportPage {

  assessmentId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.assessmentId = navParams.data.assessmentId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiskReportPage');
  }

}
