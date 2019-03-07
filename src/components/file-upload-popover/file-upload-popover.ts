import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { UploadService } from "../../services/upload";
import { AuthService } from "../../services/auth.service";
import { AuthUrl } from "../../services/constants";
import { ElectronService } from 'ngx-electron';



@Component({
  selector: 'file-upload-popover',
  templateUrl: 'file-upload-popover.html'
})

export class FileUploadPopoverComponent {

	questionId:		string;
	assessmentId: string;
	emitter:			any;
	file:         any;
	user: any;
	fs: any;

	constructor(	public upload: UploadService,
	              public navParams: NavParams,
		      private viewCtrl: ViewController,
		      private electronService: ElectronService) {

		var {navParams} = this;
		this.fs = electronService.remote.require('fs');

		this.questionId		= navParams.get("questionId");
		this.assessmentId = navParams.get("assessmentId");
		this.emitter			= navParams.data.emitter;

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
			console.log(file);
			var filePath = file.path
			var fileName = file.name
			var assessmentFileDir = `./file/aaaaaaa/`;
			if (!this.fs.existsSync(assessmentFileDir)) {
			console.log('no dir');
				this.fs.mkdirSync(assessmentFileDir);
			}
			//var uploadedFile = await this.upload.uploadFile(file, assessmentId, questionId);
			this.fs.copyFile(filePath, assessmentFileDir + fileName, err => console.log(err));
		  this.emitter.emit(file);
		this.viewCtrl.dismiss()
	}

}
