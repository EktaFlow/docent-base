import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController, Platform, AlertController, ToastController } from "@ionic/angular";
import { UploadService } from "../../services/upload";

import { Router, ActivatedRoute } from "@angular/router";

import { File, Entry } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Component({
  selector: "file-upload-popover",
  templateUrl: "./file-upload-popover.component.html",
  styleUrls: ["./file-upload-popover.component.scss"],
})
export class FileUploadPopoverComponent implements OnInit {
  //vars
  questionId: string;
  assessmentId: string;
  emitter: any;
  files: any[]; 
  file: any;
  user: any;
  copyFile: Entry = null;
  shouldMove = false; 


  constructor(
    public upload: UploadService,
    public navParams: NavParams,
    private popOver: PopoverController,
    
    private plt: Platform,
    private alertCtrl: AlertController,
    private fileOpener: FileOpener,
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
    
  ) {
    var { navParams } = this;

    

    this.questionId = navParams.get("questionId");
    this.assessmentId = navParams.get("assessmentId");
    this.emitter = navParams.data.emitter;
  }

  test(e) {
    
    var file = e.target.files[0];
    console.log('hey', file)

    var fileObject = {
      size: file.size,
      name: file.name,
      lastModified: file.lastModifiedDate,
    };
    console.log('fileObject', fileObject)
    this.file = fileObject
  }

  ngOnInit() {
    // console.log(124, this.files)
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

  ngAfterViewInit() {
    // console.log(421, this.files)
  }

  async fileSelected($event) {
    const selected = (<HTMLInputElement>document.getElementById("asdf")).files[0];
    const {assessmentId, questionId} = this;

    const uploaded = await this.upload.uploadFile(
      selected,
      questionId,
      assessmentId

    )

    this.emitter.emit(uploaded)
    this.popOver.dismiss(); 

  }

  
  async uploadFile(event) {

    
    
    var { assessmentId, questionId } = this;

    // boooooooooooooooooooo typescript
    var file = (<HTMLInputElement>document.getElementById("asdf")).files[0];
    
    var uploadedFile = await this.upload.uploadFile(
      file,
      assessmentId,
      questionId
    );

    this.emitter.emit(uploadedFile);
    this.popOver.dismiss();
  }
}


