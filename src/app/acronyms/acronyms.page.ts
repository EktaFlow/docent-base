import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from './helpers/GoogleAnalytics';
import { AcronymPopoverComponent } from './acronym-popover/acronym-popover';
import { ActivatedRoute } from  "@angular/router"

@Component({
  selector: 'acronyms',
  templateUrl: './acronyms.page.html',
  styleUrls: ['./acronyms.page.scss'],
})
export class AcronymsPage implements OnInit {
  //vars
  mainTitle: String;
  assessmentId: any;
  noSecondBar: boolean = false;
  pageName: any = "Acronyms";
  private acronyms: any = {};
  private acronymsKeys: any = [];


constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public http: HttpClient,
  public popOver: PopoverController,
  public activatedRoute: ActivatedRoute
) {
        this.mainTitle = "Acronyms";
        this.assessmentId = this.activatedRoute.snapshot.paramMap.get('assessmentId');

}

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
  this.popOver.create(
    AcronymPopoverComponent,
    {fullText: fullText},
    {cssClass: 'acro-popup'})
  .then(
    popover => popover.present({
      ev: event
    })
  );
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
