import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { UploadService } from "../../services/upload";
import { AuthService } from "../../services/auth.service";
import { AuthUrl } from "../../services/constants";
import {ElectronService} from "ngx-electron";
import {isElectron} from "../../services/constants";
// import * as file from "file-system"
// var file = require("file-system")
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


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
  fsys: any;


  constructor(
    public upload: UploadService,
  	public navParams: NavParams,
    private popOver: PopoverController,
    private electronService: ElectronService,
    // private fs: fs
  ) {
    var {navParams} = this;

		this.questionId		= navParams.get("questionId");
		this.assessmentId = navParams.get("assessmentId");
		this.emitter			= navParams.data.emitter;
    this.assessmentName = navParams.get("assessmentName");
    // console.log(fs)
    // this.fsys = window.require('fs');
    this.fsys = file;
    console.log(this.fsys);
    console.log(this.fsys.fs);
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
      // if (!this.fsys.fileMatch('./file/')) {this.fsys.mkdirSync('./file/')}
      console.log(FileSystem);
      console.log(Directory)
      if (!FileSystem.stat('./file/')) {FileSystem.mkdir('./file/')}
    //   var random = Math.floor(Math.random() * 20492039);
    //   var assessmentFileDir = `./file/${this.assessmentName}-${random}/`
    //   if (!this.fsys.fileMatch(assessmentFileDir)){
    //     this.fsys.mkdirSync(assessmentFileDir);
    //   }
    //   this.fsys.copyFileSync(filePath, assessmentFileDir + fileName, err => console.log(err));
    //   var emitted = {
    //     path: assessmentFileDir + fileName,
    //     name: file.name
    //   }
    //   this.emitter.emit(emitted);
    //   this.popOver.dismiss()
    // }

	}
}
}
