import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';


@IonicPage({
  segment: 'reset/:cool/:beans'
})
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  private userInfo: any;
  private cool: any;
  private beans: any;

  constructor(private auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    if (!this.navParams.data.coolness) {
    console.log(this.navParams.data);
    this.cool = this.navParams.data.cool;
    this.beans = this.navParams.data.beans;
    // this.parseUrl();
    this.navCtrl.push('ResetPage', {coolness: "cool"});
    // this.userInfo = this.parseUrl();
        }
  }


  // This ugly little beast is a hacky way to pull the params from the url
  parseUrl() {
    var url = window.location.href;
    
    try { 
     
        console.log("assume");
      var captures = url.match(/=(.*?)(&|$)/g)
                        .map( a => a.replace(/(&|=)/g, ""));
    
//        console.log(captures[0]);
 //       console.log(captures[1]);

      return { 
       email: captures[0],
       token: captures[1]
      }; 
    }
    catch(err) {
        // if there's a malformed url match it's someone being cute, so we don't care
        // too much right now about the error handling here.
        console.log(err);
        return {};
    }
  }

  handleResetClick() {
     console.log(this.userInfo);
     this.auth.resetPassword(this.userInfo)
//              .subscribe( res => console.log(res));
  }

  ionViewDidLoad() {
  }

}
