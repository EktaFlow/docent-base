import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserDashboardPage } from "../../pages/user-dashboard/user-dashboard.page";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { Router } from "@angular/router";

@Component({
  selector: "login-component",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: any = {};
  public errors: any = [];
  @Output() toggleClicked = new EventEmitter<string>();

  constructor(private auth: AuthService, public router: Router) {}

  ionViewWillEnter() {
    GoogleAnalytics.trackView("login");
  }
  ngOnInit() {}

  submitLogin() {
    let isValid = this.validateInput();

    if (isValid) {
      this.auth.login(this.user).subscribe(
        (user) =>
          (<any>user).jwt
            ? this.router.navigate(["/home"])
            : this.incorrectCredentials(),
        (error) => this.incorrectCredentials()
      );
    }
  }

  incorrectCredentials() {
    this.errors.push("That username password combination is incorrect");
  }

  checkError(errorType) {
    // if you set up a counter, it turns out checkError updates with any and all event updates
    // this.counter++;
    return this.errors.includes(errorType);
  }

  validateInput() {
    let { user } = this;
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
    let regexPass = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.{10,})/;
    let validPass = regexPass.test(passwd);

    !validPass ? this.errors.push("invalid_passwd") : null;
  }

  checkEmail(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validEmail = regexEmail.test(email);

    !validEmail ? this.errors.push("invalid_email") : null;
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
