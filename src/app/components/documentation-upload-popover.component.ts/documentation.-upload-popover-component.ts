import { Component, OnInit } from "@angular/core";
import {
  NavParams,
  PopoverController,
  Platform,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { UploadService } from "../../services/upload";
import { Router, ActivatedRoute } from "@angular/router";

import { File, Entry } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Component({
  selector: "documentation-upload-popover",
  templateUrl: "./documentation-upload-popover.component.html",
})
export class DocumentationUploadPopoverComponent implements OnInit {
  //variabless
  questionId: string;
  assessmentId: string;
  emitter: any;
  directories: [];
  folder: any;
  user: any;
  copyFile: Entry = null;
  shouldMove = false;

  constructor(
    public upload: UploadService,
    public navParams: NavParams,
    private popOver: PopoverController,
    private file: File,
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

  ngOnInit() {
    this.folder = this.route.snapshot.paramMap.get("folder") || "";
    // this.loadDocuments();
  }



}
