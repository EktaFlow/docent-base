import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Intercom } from "ng-intercom";

@Component({
  selector: "login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  componentShown: string = "login";

  constructor(
    auth: AuthService,
    public intercom: Intercom
  ) {
    if (auth.reset) {
      this.componentShown = "doreset";
    }
  }

  ngOnInit() {
    this.intercom.boot({
      app_id: "olfft7tm",
      // Supports all optional configuration.
      widget: {
        activator: "#intercom",
      },
    });
  }

  onToggle(componentToShow) {
    this.componentShown = componentToShow;
  }
}
