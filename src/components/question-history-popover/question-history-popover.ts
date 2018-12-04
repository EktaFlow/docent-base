import { Component } from '@angular/core';

/**
 * Generated class for the QuestionHistoryPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-history-popover',
  templateUrl: 'question-history-popover.html'
})
export class QuestionHistoryPopoverComponent {

  text: string;

  constructor() {
    console.log('Hello QuestionHistoryPopoverComponent Component');
    this.text = 'Hello World';
  }

}
