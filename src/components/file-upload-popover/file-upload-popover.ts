import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the FileUploadPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'file-upload-popover',
  templateUrl: 'file-upload-popover.html'
})
export class FileUploadPopoverComponent {

	questionId: string;
	
	constructor( public navParams: NavParams) {
		this.questionId = this.navParams.get("questionId");
		console.log(this.questionId);
  }

}
