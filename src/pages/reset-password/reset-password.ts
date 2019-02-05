/**
* The purpose of this page is to get the url parameters from a password reset
* and pass them down to the actual reset component (which does the real work)
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 @IonicPage({
    segment: 'reset-password/:page/:token/:email'
 })
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
  }

  userEmail: string = this.navParams.get('email');
  userToken: string = this.navParams.get('token');
  userInput: any    = {};
  errors:    string[] = [];

  submitReset() {
  /*
      if ( this.validateInput() ) 
     authservice.sendResetPost
        .subscribe(data => {
              launchtoast;
              set the currentUser stuff to true and log person in.
            },
            ( error ) => {
            'there was a problem'
          })
  */
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
