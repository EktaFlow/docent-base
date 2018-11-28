import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController, ViewController } from 'ionic-angular';

@Component({
  selector: 'password-reset',
  templateUrl: 'password-reset.html'
})
export class PasswordResetComponent {
  private emailInput: string = null;

  constructor( private auth: AuthService,
               private toast: ToastController,
                private viewCtrl: ViewController ) {}

  
  handleResetClick() {
    try {
      this.emailInput ? this.resetPassword() : this.showNoTextToast()
    }
    catch(error) {
       // todo - legit error handling
       console.error(error);
    }
  }

  showNoTextToast() {
    this.toast.create({
      message: 'You must enter some email address',
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'ok'
    }).present();
  }

  resetPassword() {
    this.auth.resetPassword(this.emailInput);
    this.showSuccessToast(this.emailInput);
    this.viewCtrl.dismiss();
  }

  showSuccessToast(email) {
    this.toast.create({
      message: 'Success, if you have a Docent account, reset information will be sent to ' + email,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'ok'
    }).present();
  }

}
