import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { UploadService } from "../../services/upload";
// import { AuthService } from "../../services/auth.service";
// import { AuthUrl } from "../../services/constants";


@Component({
  selector: 'json-upload-popover',
  templateUrl: 'json-upload-popover.html'
})

export class JsonUploadPopoverComponent {

	questionId:		string;
	assessmentId: string;
	emitter:			any;
	file:         any;
	user: any;
	finalFile: any;

	constructor(	public upload: UploadService,
								public navParams: NavParams) {

		var {navParams} = this;

		this.questionId		= navParams.get("questionId");
		this.assessmentId = navParams.get("assessmentId");
		this.emitter			= navParams.data.emitter;

  }

	test(e) {
		this.file = e.target.files[0];
    console.log(this.file);

		// var fileObject = {
		// 	size: file.size,
		// 	name: file.name,
		// 	lastModified: file.lastModifiedDate
		// }

		// this.file = fileObject;
	}

	ngOnInit() {
		console.log("this has an on-init function");
		var styling = `
		padding: 30px;
    height: 400px;
		width: 800px;
		`

		var test = document.getElementsByClassName("popover-content")

    var newVar = test[test.length - 1] as HTMLElement;

				newVar.style.cssText = styling
	}

	// async uploadFile(event) {
	// 	var { assessmentId, questionId } = this;
	//
	// 	// boooooooooooooooooooo typescript
	// 	var file = (<HTMLInputElement>document.getElementById("asdf")).files[0];
	// 	var uploadedFile = await this.upload.uploadFile(file, assessmentId, questionId);
	//
	// 	this.emitter.emit(uploadedFile);
	// }

  async uploadJSON(event){
    // var file = (<HTMLInputElement>document.getElementById("asdf")).files[0];
    var file = this.file;
		var fileName = this.file.name;
		var fileReader = new FileReader();
		fileReader.readAsText(this.file);
		// var coolUpload = this.upload.uploadJSON.bind(this);
		// var coolEmit = this.emitter.emit.bind(this);
		fileReader.onloadend = () => {

			console.log(fileReader.result);
			var finalFile = {
				file: JSON.parse(fileReader.result),
				fileName: fileName
			}
			console.log(finalFile);
			console.log(this);
			this.upload.uploadJSON(finalFile);
			// coolEmit(uploadedFile);
		}
		// var uploadedFile = await this.upload.uploadJSON(file);
  }
}
