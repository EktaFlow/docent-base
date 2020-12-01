import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController } from '@ionic/angular';
import { UploadService } from "../../services/upload";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'json-upload-popover',
  templateUrl: './json-upload-popover.component.html',
  styleUrls: ['./json-upload-popover.component.scss'],
})
export class JsonUploadPopoverComponent implements OnInit {
  //vars
  questionId:		string;
	assessmentId: string;
	emitter:			any;
	file:         any;
	user: any;
	finalFile: any;

  constructor(
    public upload: UploadService,
    private toastCtrl: ToastController,
		private activatedRoute: ActivatedRoute
  ) {
			this.questionId = activatedRoute.snapshot.paramMap.get('questionId');
			this.assessmentId = activatedRoute.snapshot.paramMap.get('assessmentId');
			this.emitter = activatedRoute.snapshot.paramMap.get('emitter');
  }

  setFile(e) {
		this.file = e.target.files[0];
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


  async invalidJSONToast() {
	  var toast = await this.toastCtrl.create({
	    message: 'It appears this file is not valid JSON',
	    duration: 4500,
      position: 'top',
      cssClass: 'error-toast'
	  });

    await toast.present();
  }

  async unknownErrorToast() {
	  var toast = await this.toastCtrl.create({
	    message: 'Unknown error',
	    duration: 4500,
      position: 'top',
      cssClass: 'error-toast'
	  });

    await toast.present();
  }

  async uploadJSON(event){
    // TODO -- change this to allow user input to name the file.
		// var fileName = this.file.name;
		var fileReader = new FileReader();
		fileReader.readAsText(this.file);
		fileReader.onloadend = () => {

    try {
			var finalFile = {
				file: JSON.parse(<string>(fileReader.result)),
				fileName: this.file.name
		}

		var uploadResponse = this.upload.uploadJSON(finalFile);
    <any>uploadResponse.subscribe(a => {
	    var user = localStorage.getItem('docent-token');
	    user = JSON.parse(user);
	    (<any>user).user = a;
	    localStorage.setItem('docent-token', JSON.stringify(user));
		})
    }
    catch (error) {
       if (error.message.includes('Unexpected token')) {
        this.invalidJSONToast();
       } else {
        this.unknownErrorToast();
       }
    }
		}
  }

}
