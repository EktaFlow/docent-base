import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  componentShown: string = 'login';

    constructor(auth: AuthService) {
      if (auth.reset) {
        this.componentShown = 'doreset';
      }

    }

    ngOnInit(){}

    onToggle(componentToShow) {
      this.componentShown = componentToShow;
    }


}
