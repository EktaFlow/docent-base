import { Component } from '@angular/core';

/**
 * Generated class for the LegendPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'legend-popover',
  templateUrl: 'legend-popover.html'
})
export class LegendPopoverComponent {

  text: string;

  constructor() {
    console.log('Hello LegendPopoverComponent Component');
    this.text = 'Hello World';
  }

}
