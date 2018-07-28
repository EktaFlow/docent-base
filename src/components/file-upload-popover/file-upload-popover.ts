import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';
import {UploadService } from "../../services/upload";

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
	
	constructor( public upload: UploadService, public navParams: NavParams) {
		this.questionId = this.navParams.get("questionId");
		console.log(this.questionId);
  }

	uploadFile(event) {
		var file = document.getElementById("asdf").files[0];
		this.upload.uploadFile(file);
	}

}
