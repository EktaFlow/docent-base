import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { UploadService } from "../../services/upload";
import { AuthService } from "../../services/auth.service";
import { AuthUrl } from "../../services/constants";
import {ElectronService} from "npx-electron";
import {isElectron} from "../../services/constants";

@Component({
  selector: 'file-upload-popover',
  templateUrl: './file-upload-popover.component.html',
  styleUrls: ['./file-upload-popover.component.scss'],
})
export class FileUploadPopoverComponent implements OnInit {
  //vars
  questionId:	string;
	assessmentId: string;
	emitter: any;
	file: any;
	user: any;
  inAssessment: any;
  isElectron: any;
  assessmentName: any;
  fs: any;

  constructor(
    public upload: UploadService,
  	public navParams: NavParams,
    private popOver: PopoverController,
    private electronService: ElectronService
  ) {
    var {navParams} = this;

		this.questionId		= navParams.get("questionId");
		this.assessmentId = navParams.get("assessmentId");
		this.emitter			= navParams.data.emitter;
    this.assessmentName = navParams.get("assessmentName")
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
    this.isElectron = isElectron;
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
    if (!this.isElectron){
      var { assessmentId, questionId } = this;

  		// boooooooooooooooooooo typescript
  		var file = (<HTMLInputElement>document.getElementById("asdf")).files[0];
  		var uploadedFile = await this.upload.uploadFile(file, assessmentId, questionId);

  		this.emitter.emit(uploadedFile);
  		this.popOver.dismiss()
    } else {
      var file = (<HTMLInputElement>document.getElementById("asdf")).files[0];
      var filePath = file.path;
      var fileName = file.name;
      if (!this.fs.existsSync('./file/')) {this.fs.mkdirSync('./file/')}
      var assessmentFileDir = `./file/${this.assessmentName}-${this.assessmentId.substr(0,5)}/`
      if (!this.fs.existsSync(assessmentFileDir)){
        this.fs.mkdirSync(assessmentFileDir);
      }
      this.fs.copyFile(filePath, assessmentFileDir + fileName, err => console.log(err));
      var emitted = {
        path: assessmentFileDir + fileName,
        name: file.name
      }
      this.emitter.emit(emitted);
      this.popOver.dismiss()
    }

	}

}
