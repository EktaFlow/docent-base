import { Component } from '@angular/core';
import { NavParams, ViewController} from 'ionic-angular'


/**
 * Generated class for the AcronymPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 
@Component({
  selector: 'acronym-popover',
  templateUrl: 'acronym-popover.html'
})
export class AcronymPopoverComponent {

  text: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log('Hello AcronymPopoverComponent Component');
    this.text = navParams.data.fullText;
  }

}
