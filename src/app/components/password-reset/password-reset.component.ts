import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "password-reset",
  templateUrl: "password-reset.component.html",
  styleUrls: ["./password-reset.component.scss"],
})
export class PasswordResetComponent implements OnInit {
  public emailInput: string = null;
  public errors = [];
  public user: any = {};
  @Output() toggleClicked = new EventEmitter<string>();

  constructor(private auth: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() {
    //hello
  }

  handleResetClick() {
    try {
      this.emailInput ? this.resetPassword() : this.showNoTextToast();
    } catch (error) {
      // todo - legit error handling
      console.error(error);
    }
  }

  showLogin() {
    this.toggleClicked.emit("login");
  }

  async showNoTextToast() {
    var toast = await this.toastCtrl.create({
      message: "You must enter some email address",
      duration: 5000,
      position: "top",
    });

    await toast.present();
  }

  resetPassword() {
    this.auth.resetPassword(this.emailInput);
    this.showSuccessToast(this.emailInput);
  }

  async showSuccessToast(email) {
    var toast = await this.toastCtrl.create({
      message:
        "Success, if you have a Docent account, reset information will be sent to " +
        email,
      duration: 5000,
      position: "top",
    });
    await toast.present();
  }
}
