import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';
import {UploadService } from "../../services/upload";

@Component({
  selector: 'file-upload-popover',
  templateUrl: 'file-upload-popover.html'
})
export class FileUploadPopoverComponent {

	questionId: string;
	assessmentId: string;
	
	constructor( public upload: UploadService, public navParams: NavParams) {
		this.questionId = this.navParams.get("questionId");
		this.assessmentId = this.navParams.get("assessmentId")
  }

	uploadFile(event) {
		var file = document.getElementById("asdf").files[0];
		this.upload.uploadFile(file, this.assessmentId, this.questionId);
	}

}
