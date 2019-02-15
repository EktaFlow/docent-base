import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController } from 'ionic-angular';
import { UserDashboardPage } from '../../pages/user-dashboard/user-dashboard';

import { Url } from '../../services/constants';

@Component({
  selector: 'do-reset',
  templateUrl: 'do-reset.html'
})
export class DoResetComponent {

  @Input() email;
  @Input() token;
  text: string;
  private errors  = [];
  passwd: string  = '';
  passwd2: string = ''
  resetDone: boolean = false;

  constructor( private auth: AuthService, private navCtrl: NavController ) {}

  async handleResetClick() {
    console.log('we resettin'); 

    var resetResult = await this.auth.doPasswordReset(this.passwd);
    this.resetDone = true;

    setTimeout(() => window.location.replace(Url), 1200);
  }

}
