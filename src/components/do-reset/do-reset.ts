import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the DoResetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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

  constructor( private auth: AuthService ) {}

  handleResetClick() {
    console.log('we resettin'); 
    console.log(this.auth);
    console.log(this.auth.resetEmail);
    // call all the login goodness here.
  }

}
