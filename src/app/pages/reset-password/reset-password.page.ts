import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  userEmail: string = this.navParams.get('email');
  userToken: string = this.navParams.get('token');
  userInput: any    = {};
  errors:    string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);

  }



  submitReset() {
     //  if ( this.validateInput() )
     // authservice.sendResetPost
     //    .subscribe(data => {
     //          launchtoast;
     //          set the currentUser stuff to true and log person in.
     //        },
     //        ( error ) => {
     //        'there was a problem'
     //      })
  }

  validateInput() {
    if (!this.userInput.passwd) { this.errors.push('passwd') }
    if (!this.userInput.passwd2) { this.errors.push('passwd2') }
    if (this.userInput.passwd && this.userInput.passwd2 && this.userInput.passwd !== this.userInput.passwd2 ) {
      this.errors.push('no_match');
    }
    if ( this.errors.length == 0 ) {
      //authservice.validatePasswordStrength
      // { this.errors.push('invalid')}
    }
  }


}
