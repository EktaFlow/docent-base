import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssessmentService } from "../../services/assessment.service";

@IonicPage()
@Component({
  selector: 'page-new-assessment',
  templateUrl: 'new-assessment.html',
})
export class NewAssessmentPage {

	threads: any;
	schema: any;

constructor(public navCtrl: NavController, 
						public navParams: NavParams,
            private assessmentService: AssessmentService) {
  }

	async ngOnInit() {
		var threads = await this.assessmentService.getThreads()
		threads.subscribe( ({data}) => {
			this.threads = data.allThreadNames.map(name => {
				return ({name, index: data.allThreadNames.indexOf(name) + 1});
			});
		});
	}

}
