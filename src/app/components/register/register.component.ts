import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { HomePage } from "../../pages/home/home.page";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public user = {};
  public errors: any = [];
  public submitted: boolean = false;
  @Output() toggleClicked = new EventEmitter<string>();

  constructor(private auth: AuthService) {}
  ngOnInit() {}

  ionViewWillEnter() {
    GoogleAnalytics.trackView("register");
  }

  submitRegistration() {
    var isValid = this.validateInput();

    if (isValid) {
      this.errors = [];
      this.auth.registerUser(this.user).subscribe(
        (user) => {
          this.submitted = true;
        },

        // error handling taking the text of the error directly.
        ({ error }) => {
          this.errors.push(error.error);
        }
      );
    }
  }

  checkError(errorType) {
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
    if (!input.name) this.errors.push("name");
    if (!input.email) this.errors.push("email");
    if (!input.passwd) this.errors.push("passwd");
    if (!input.passwd2) this.errors.push("passwd2");
  }

  checkPasswords(input) {
    if (input.passwd !== input.passwd2 && input.passwd && input.passwd2) {
      this.errors.push("no_match");
    } else {
      this.checkPasswordRules(input.passwd);
    }
  }

  checkPasswordRules(passwd) {
    let regexPass = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.{8,})/;
	let validPass= regexPass.test(passwd);

    !validPass ? this.errors.push("invalid_passwd")
 : null;
  }

  checkEmail(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validEmail = regexEmail.test(email);

    !validEmail ? this.errors.push("invalid_email") : null;
  }

  removeErrors() {
    this.errors = [];
  }

  toggle() {
    this.toggleClicked.emit("login");
  }
}
