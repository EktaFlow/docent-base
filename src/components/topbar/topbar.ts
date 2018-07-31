import { Component, Input } from '@angular/core';
import { PopoverController, NavController } from "ionic-angular";
import { ViewsComponent } from "../views/views";
import { RegisterPage } from "../../pages/register/register";
import { LoginPage }    from "../../pages/login/login";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.html'
})

export class TopbarComponent {

	@Input()
	public assessmentId: any;
	public loginPage		= LoginPage;
	public registerPage = RegisterPage;

constructor( public popOver: PopoverController,
						 public auth: AuthService,
						 public navCtrl: NavController ) { }

	ngOnInit() {
		console.log(this.assessmentId);
	}

  presentViewsPop(event){
	let popover = this.popOver.create(ViewsComponent, {assessmentId: this.assessmentId});
    popover.present({
      ev: event
    });
  }

	registerNav() { this.navCtrl.push( this.registerPage ); }
	loginNav() { this.navCtrl.push( this.loginPage ); }
	logout() { this.auth.logout()}

}
