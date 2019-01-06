import { Component } from '@angular/core';
import { NavParams,
         ViewController,
         ToastController } from 'ionic-angular';
import { AssessmentService } from "../../services/assessment.service";

@Component({
  selector: 'file-delete',
  templateUrl: 'file-delete.html'
})
export class FileDeleteComponent {

  assessmentId: string;
  fileId: string;

  constructor( private navParams:         NavParams,
               private viewController:    ViewController,
               private assessmentService: AssessmentService,
               private toastController:   ToastController ) 
  {
    this.assessmentId = this.navParams.get('assessmentId');
    this.fileId       = this.navParams.get('fileId');
    this.emitter      = this.navParams.get('emitter');
    //    console.log(this.assessmentId, this.fileId, this.emitter);
  }

  async deleteFile() {
    
    var ok = await this.assessmentService.deleteFile(this.assessmentId, this.fileId)
    // what about errors?
    ok.subscribe(a => { 
      this.emitter.emit(this.fileId);
      this.launchToast(); 
      this.closePopover();
    });
    // launch toast?
    // this.closePopover();
  }

  closePopover() {
    this.viewController.dismiss();
  }

  launchToast() {
    this.toastController.create({
      message: 'file deleted',
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'ok'
    }).present();
  }

}
