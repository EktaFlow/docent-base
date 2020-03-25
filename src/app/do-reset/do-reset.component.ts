import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';
import { UserDashboardPage } from '../user-dashboard/user-dashboard.page';

import { Url } from '../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-do-reset',
  templateUrl: './do-reset.component.html',
  styleUrls: ['./do-reset.component.scss'],
})
export class DoResetComponent implements OnInit {

  @Input() email;
  @Input() token;
  text: string;
  private errors  = [];
  passwd: string  = '';
  passwd2: string = ''
  resetDone: boolean = false;

  constructor( private auth: AuthService,
               private navCtrl: NavController,
               public router: Router) {}
  ngOnInit() {}

  async handleResetClick() {
    console.log('we resettin');

    var resetResult = await this.auth.doPasswordReset(this.passwd);
    this.resetDone = true;

    setTimeout(() => window.location.replace(Url), 1200);
  }

}
