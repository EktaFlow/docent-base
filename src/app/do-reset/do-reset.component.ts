import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';
import { UserDashboardPage } from '../user-dashboard/user-dashboard.page';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'do-reset',
  templateUrl: './do-reset.component.html',
  styleUrls: ['./do-reset.component.scss'],
})
export class DoResetComponent implements OnInit {
  //vars
  @Input() email;
  @Input() token;
  text: string;
  private errors  = [];
  passwd: string  = '';
  passwd2: string = ''
  resetDone: boolean = false;

  constructor( private auth: AuthService, private navCtrl: NavController, public router: Router ) { }
  ngOnInit(){}
  async handleResetClick() {
    console.log('we resettin');

    var resetResult = await this.auth.doPasswordReset(this.passwd);
    this.resetDone = true;

    setTimeout(() => this.router.navigate(["/user-dashboard"]), 1200);
  }

  // ngOnInit() {}

}
