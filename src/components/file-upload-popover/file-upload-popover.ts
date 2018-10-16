import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { UploadService } from "../../services/upload";

@Component({
  selector: 'file-upload-popover',
  templateUrl: 'file-upload-popover.html'
})

export class FileUploadPopoverComponent {

	questionId:		string;
	assessmentId: string;
	emitter:			any;
	file:         any;
	userId: any;

	constructor(	public upload: UploadService,
	              public navParams: NavParams,
                private viewCtrl: ViewController
	) {

		var {navParams} = this;

		this.questionId		= navParams.get("questionId");
		this.assessmentId = navParams.get("assessmentId");
		this.emitter			= navParams.data.emitter;
		this.userId = navParams.data.userId;
  }

	test(e) {
		var file = e.target.files[0];

		var fileObject = {
			size: file.size,
			name: file.name,
			lastModified: file.lastModifiedDate
		}

		this.file = fileObject;
	}

	ngOnInit() {
		console.log("this has an on-init function");
		// var styling = `
		// padding: 30px;
    // height: 400px;
		// width: 800px;
		// `
		//
		// var test = document.getElementsByClassName("popover-content")
		//
    // var newVar = test[test.length - 1] as HTMLElement;
		// newVar.style.cssText = styling
	}

	async uploadFile(event) {
		var { assessmentId, questionId } = this;

		// boooooooooooooooooooo typescript
		var file = (<HTMLInputElement>document.getElementById("asdf")).files[0];
		if (this.userId){
			var uploadedFile = await this.upload.uploadFile(file, this.userId, null);
		} else {
			var uploadedFile = await this.upload.uploadFile(file, assessmentId, questionId);
		}

		this.emitter.emit(uploadedFile);
		this.viewCtrl.dismiss()
	}
}
