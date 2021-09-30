import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { UploadService } from "../../services/upload";

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
  file: any;
  user: any;


  constructor(
    public upload: UploadService,
    public navParams: NavParams,
    private popOver: PopoverController,
  ) {
    var { navParams } = this;

    this.questionId = navParams.get("questionId");
    this.assessmentId = navParams.get("assessmentId");
    this.emitter = navParams.data.emitter;
  }

  // modify(fileName) {
  //   console.log('modifying')
  //   const ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)

  //   let newName = fileName.replace('.' + ext, '');
  //   if (fileName.length <=8) {
  //     return this.file.name
  //   }
  //   newName = newName.substring(0, 8) + (fileName.length > 8 ? '[...]' : '')
  //   return newName + '.' + ext
  // }

  test(e) {
    var file = e.target.files[0];

    var fileObject = {
      size: file.size,
      name: file.name,
      lastModified: file.lastModifiedDate,
    };
    this.file = fileObject;
  }

  ngOnInit() {
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
    
    var uploadedFile = await this.upload.uploadFile(
      file,
      assessmentId,
      questionId
    );

    this.emitter.emit(uploadedFile);
    this.popOver.dismiss();
  }
}

