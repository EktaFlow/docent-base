import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { UploadService } from "../../services/upload";

@Component({
  selector: 'file-upload-popover',
  templateUrl: 'file-upload-popover.html'
})

export class FileUploadPopoverComponent {

	questionId:		string;
	assessmentId: string;
	emitter:			any;
	
	constructor(	public upload: UploadService, 
								public navParams: NavParams) {

		var {navParams} = this;

		this.questionId		= navParams.get("questionId");
		this.assessmentId = navParams.get("assessmentId");
		this.emitter			= navParams.data.emitter;
  }

	async uploadFile(event) {
		var { assessmentId, questionId } = this;

		// boooooooooooooooooooo typescript
		var file = (<HTMLInputElement>document.getElementById("asdf")).files[0];
		var uploadedFile = await this.upload.uploadFile(file, assessmentId, questionId);

		this.emitter.emit(uploadedFile);
	}
}
