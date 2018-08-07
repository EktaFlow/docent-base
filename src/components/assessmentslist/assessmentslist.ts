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

	ngOnInit() {
		console.log("this has an on-init function");
		var styling = `
		padding: 30px;
    min-height: 400px;
		width: 800px;
		`

		var test = document.getElementsByClassName("popover-content")

		var	newVar = test[test.length - 1] as HTMLElement;
				newVar.style.cssText = styling;

	}

	loadAssessment(id) {
		this.navController.push(QuestionsPage, {data: id})
	}

}
