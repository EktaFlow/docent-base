import { Component } from '@angular/core';
import { NavParams } from "ionic-angular"

/**
 * Generated class for the AssessmentslistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'assessmentslist',
  templateUrl: 'assessmentslist.html'
})
export class AssessmentslistComponent {

  text: string;
	assessments: any;

  constructor(public navParams:NavParams) {
    console.log('Hello AssessmentslistComponent Component');
    this.text = 'Hello World';
		this.assessments = this.navParams.get("assessments");
  }

}
