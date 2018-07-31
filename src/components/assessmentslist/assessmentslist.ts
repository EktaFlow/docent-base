import { Component } from '@angular/core';
import { NavParams, NavController } from "ionic-angular"
import { QuestionsPage } from "../../pages/questions/questions";

@Component({
  selector: 'assessmentslist',
  templateUrl: 'assessmentslist.html'
})
export class AssessmentslistComponent {

	questionsPage: QuestionsPage; 
  text: string;
	assessments: any;

  constructor(public navParams:NavParams, public navController: NavController) {
		this.assessments = this.navParams.get("assessments");
  }

	loadAssessment(id) {
		this.navController.push(QuestionsPage, {data: id})
	}

}
