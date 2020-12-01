import { Component, OnInit, NgModule } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { AssessmentService } from '../../services/assessment.service';


@Component({
  selector: 'file-delete',
  templateUrl: './file-delete.component.html',
  styleUrls: ['./file-delete.component.scss'],
})
export class FileDeleteComponent implements OnInit {

  //vars
  assessmentId: string;
  fileId: string;
  teamMemberEmail: string;
  emitter: any;
  typeToDelete: string;

  constructor(
    private popOver: PopoverController,
    private assessmentService: AssessmentService,
    private toastController: ToastController
  ) {
		/*
    this.assessmentId = this.navParams.get('assessmentId');
    this.fileId       = this.navParams.get('fileId');
    this.emitter      = this.navParams.get('emitter');
    this.typeToDelete = this.navParams.get('typeToDelete');
    this.teamMemberEmail = this.navParams.get('teamMemberEmail');
		 */
   }

   ngOnInit(){}

   async deleteTeamMember() {
     var removedTeamMember = await this.assessmentService.removeTeamMember(this.assessmentId, this.teamMemberEmail)

     removedTeamMember.subscribe(({data}) => {
       this.emitter.emit(true);
       this.closePopover();
     });
   }

   async deleteFile() {

     var ok = await this.assessmentService.deleteFile(this.assessmentId, this.fileId)
     // what about errors?
     ok.subscribe(a => {
       this.emitter.emit(this.fileId);
       this.launchToast();
       this.closePopover();
     });
   }

   async delete() {
     this.emitter.emit(true);
     this.closePopover();
   }

   closePopover() {
     this.popOver.dismiss();
   }

   async launchToast() {
     let toast = await this.toastController.create({
       message: 'file deleted',
       duration: 3000,
       position: 'top',
     });
     await toast.present();
   }

  // ngOnInit() {}

}
