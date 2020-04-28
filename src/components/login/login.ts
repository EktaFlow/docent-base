import { Component, EventEmitter, Output } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { UserDashboardPage } from "../../pages/user-dashboard/user-dashboard";
import { GoogleAnalytics } from "../../application/helpers/GoogleAnalytics";

@Component({
  selector: "login",
  templateUrl: "login.html",
})
export class LoginComponent {
  user: any = {};
  counter: any = 0;
  private errors: any = [];
  @Output() toggleClicked = new EventEmitter<string>();

  constructor(private auth: AuthService, public navCtrl: NavController) {}

  ionViewWillEnter() {
    GoogleAnalytics.trackView("login");
  }

  submitLogin() {
    var isValid = this.validateInput();

    if (isValid) {
      this.errors = [];
      this.auth.login(this.user).subscribe((user) => {
        (<any>user).jwt
          ? this.navCtrl.push(UserDashboardPage)
          : ({ error }) => {
              this.errors.push(error.error);
            };
      });
    }
  }

  checkError(errorType) {
    // if you set up a counter, it turns out checkError updates with any and all event updates
    // this.counter++;
    return this.errors.includes(errorType);
  }

  validateInput() {
    var { user } = this;
    this.errors = [];

    this.checkPresence(user);
    this.checkPasswords(user);
    this.checkEmail((<any>user).email);

    return this.errors == false;
  }

  checkPresence(input) {
    if (!input.email) this.errors.push("email");
    if (!input.passwd) this.errors.push("passwd");
  }

  checkPasswords(input) {
    this.checkPasswordRules(input.passwd);
  }

  checkPasswordRules(passwd) {
    var regEx = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,72}$/;
    var test = regEx.test(passwd);

    !test ? this.errors.push("invalid_passwd") : null;
  }

  checkEmail(email) {
    var regEx = /\S+@\S+\.\S+/;
    var test = regEx.test(email);

    !test ? this.errors.push("invalid_email") : null;
  }

  removeErrors() {
    this.errors = [];
  }
  showRegister() {
    this.toggleClicked.emit("register");
  }
  showPasswordReset() {
    this.toggleClicked.emit("reset");
  }
}
