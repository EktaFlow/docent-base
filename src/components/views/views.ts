import { Component } from '@angular/core';

/**
 * Generated class for the ViewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'views',
  templateUrl: 'views.html'
})
export class ViewsComponent {

  text: string;

  constructor() {
    console.log('Hello ViewsComponent Component');
    this.text = 'Hello World';
  }

}
