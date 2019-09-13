import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController, ViewController } from '@ionic/angular';


@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  private emailInput: string = null;
  private errors = [];
  private user: any = {};
  @Output() toggleClicked = new EventEmitter<string>();


  constructor(
    private auth: AuthService,
    private toast: ToastController,
    private viewCtrl: ViewController
  ) { }

  handleResetClick() {
    try {
      this.emailInput ? this.resetPassword() : this.showNoTextToast()
    }
    catch(error) {
       // todo - legit error handling
       console.error(error);
    }
  }

  showLogin() {
    this.toggleClicked.emit('login');
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
