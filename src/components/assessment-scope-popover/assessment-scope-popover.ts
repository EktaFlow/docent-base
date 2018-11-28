import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";


/**
 * Generated class for the AssessmentScopePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'assessment-scope-popover',
  templateUrl: 'assessment-scope-popover.html'
})
export class AssessmentScopePopoverComponent {

  text: string = "The scope is not working for some reason when it comes from the questions page to the topbar to here so right now just to figure out if the popover is styled correctly. ";
  scope: any;
  targetDate: any;
  targetMRL: any;

  constructor(public navParams: NavParams) {
    this.scope = navParams.data.scopeText;
    this.targetMRL = navParams.data.targetMRL;
    this.targetDate = navParams.data.targetDate;
    console.log(this.scope);
  }



}
