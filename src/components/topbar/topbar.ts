import { Component, Input } from '@angular/core';
import { PopoverController, NavController } from "ionic-angular";
import { ViewsComponent } from "../views/views";
import { RegisterPage } from "../../pages/register/register";
import { LoginPage }    from "../../pages/login/login";
import { AuthService } from "../../services/auth.service";
import { HelpmenuComponent } from "../helpmenu/helpmenu";

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.html'
})

export class TopbarComponent {

	public loginPage		= LoginPage;
	public registerPage = RegisterPage;
	@Input() public assessmentId: any;
	// the question info is only relevant for the questions page. whereas the assessments info is relevant for all the pages.
	@Input() private mainTitle: any;
	@Input() private subTitle: any;


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

	showHelp(event) {
		this.popOver.create(HelpmenuComponent, {assessmenId: this.assessmentId})
		            .present({ev: event});
	}

	registerNav() { this.navCtrl.push( this.registerPage ); }
	loginNav() { this.navCtrl.push( this.loginPage ); }
	logout() { this.auth.logout()}

}
