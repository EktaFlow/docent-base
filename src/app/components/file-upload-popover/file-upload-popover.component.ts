import { Component, OnInit } from "@angular/core";
import {
  NavParams,
  PopoverController,
  Platform,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { UploadService } from "../../services/upload";
import { AssessmentService } from "../../services/assessment.service";
import { Router, ActivatedRoute } from "@angular/router";
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

import { File, Entry } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

var assessmentQuery = gql`
  query assessment($_id: String) {
    assessment(_id: $_id) {
      userId
      userEmail
      scope
      targetMRL
      teamMembers
      levelSwitching
      targetDate
      location
      deskbookVersion
      name
      threads
      questions {
        files {
          id
          questionId
          name
        }
        mrLevel
        answers {
          answer
        }
      }
    }
  }
`;

export var deleteFileMutation = gql`
  mutation deleteFile($assessmentId: String, $fileId: String) {
    deleteFile(assessmentId: $assessmentId, fileId: $fileId) {
      name
    }
  }
`;

@Component({
  selector: "file-upload-popover",
  templateUrl: "./file-upload-popover.component.html",
  styleUrls: ["./file-upload-popover.component.scss"],
})
export class FileUploadPopoverComponent implements OnInit {
  //vars
  assessment: any;
  assessmentId: string;
  question: any;
  questionId: string;
  emitter: any;
  files: any[] = []; // files from current question
  filesList: any[] = []; // files from all questions under current assessment
  file: any; // current file uploaded
  fileId: string;
  clone: any; // clone of file being uploaded or deleted
  queue: any[] = []; // queue to hold the selected file
  user: any;
  copyFile: Entry = null;
  shouldMove = false;

  constructor(
    public upload: UploadService,
    public navParams: NavParams,
    private popOver: PopoverController,
    public assessmentService: AssessmentService,
    private apollo: Apollo,
    private plt: Platform,
    private alertCtrl: AlertController,
    private fileOpener: FileOpener,
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {
    var { navParams } = this;
    console.log('navParams -->', navParams)
    this.questionId = navParams.get("questionId");
    console.log('this.questionId', this.questionId)
    this.assessmentId = navParams.get("assessmentId");
    this.emitter = navParams.data.emitter;
  }

  async test(e) {
    let { assessmentId, questionId, clone, files, filesList, assessment } =
    this;
    
    var file = e.target.files[0];

    console.log('file', file)

    var fileObject = {
      size: file.size,
      name: file.name,
      lastModified: file.lastModifiedDate,
      type: file.type
    };

    const uploadedFile = await this.upload.uploadFile(
      file,
      assessmentId,
      questionId
    );

    clone = uploadedFile;

    files.push(clone);
    filesList.push(clone);

   

    this.file = fileObject;
    const demo = await this.assessmentService.addFile(this.assessmentId, this.questionId, this.file.url, this.file.name)

    demo.subscribe((data) => {
      console.log('file-upload-popover addFile data', data)
    })

    this.emitter.emit(uploadedFile);

  }

  ngOnInit() {
    this.fetchData();
    console.log('this', this)
  }

  closePopover() {
    this.popOver.dismiss();
  }

  async fetchData() {
    // get current assessment and consolidate all the files, list these in the file nav under 'All Files'

    this.apollo
      .watchQuery<any>({
        query: assessmentQuery,
        fetchPolicy: "network-only",
        variables: { _id: this.assessmentId },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.assessment = data.assessment;
        const questions = data.assessment.questions;
        questions.map((question) => {
          question.files.map((file) => this.filesList.push(file));
        });
      });
    // get current question and consolidate all files, this these in the file nav under 'Current Files'
    const fileUQ = await this.assessmentService.getFileUploadQuestion(
      this.questionId,
      this.assessmentId
    );
    fileUQ.subscribe(({ data }) => {
      
      this.files = data.question.files;
      this.filesList = []
      this.files.map((file) => this.filesList.push(file))
      this.question = data.question;
    });

    
  }

  deleteFile() {
    console.log("testing delete");
    this.apollo
      .watchQuery<any>({
        query: deleteFileMutation,
        fetchPolicy: "network-only",
        variables: {
          assessmentId: this.assessmentId,
          questionId: this.questionId,
          name: this.file.name 
        },
      })
      .valueChanges.subscribe(({ data }) => {
        console.log("deleteFile file upload data", data);
      });
  }
}
