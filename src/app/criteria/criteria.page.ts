import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from '@ionic/angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import { HttpClient } from '@angular/common/http';
import { AssessmentService } from '../../services/assessment.service';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


import { QuestionsPage } from '../questions/questions';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	questions {
		mrLevel
		threadName
		questionText
		subThreadName
		questionId
		criteriaText
	}
	}
}
`
@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.page.html',
  styleUrls: ['./criteria.page.scss'],
})
export class CriteriaPage implements OnInit {

	allQuestions: any;
	assessmentId: any;
 	schema: any;
	filterList: any = {};
	filteredSchema: any;
	showAll: any;
	pageName: any = "Criteria";

	constructor( private apollo: 			 Apollo,
							 public navCtrl: 			 NavController,
							 public navParams: 		 NavParams,
							 public popOver: 			 PopoverController,
							 private http: HttpClient,
               private assessmentService: AssessmentService
							 ) {
  }

	ionViewWillEnter() {
    GoogleAnalytics.trackPage("criteria");
  }

  // helper function to pull unique values from array.
	unique = (item, index, array) => array.indexOf(item) == index

	async ngOnInit() {
		this.assessmentId = await this.assessmentService.getCurrentAssessmentId();

		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
					console.log(data);
					this.allQuestions = (<any>data.data).assessment.questions;
					// this.schema = this.createSchemaObject(this.allQuestions);
					this.filteredSchema = this.createSchemaObject(this.allQuestions);
					this.filteredSchema = this.filteredSchema.filter(s => s.header.length > 1);

					console.log(this.schema);
    			//this.state.fill(false);
//    			this.create();
			});
	// this.http.get('assets/json/2016.json')
	// 			.subscribe( data => {
	// 				console.log(data);
	// 				this.schema = data;
	// 				this.filteredSchema = this.createSchemaObject(this.schema);
	// 				// this.schema = data;
	// 			});

	}

	filterUnique = (array, property=null) => property ? this.filterByProperty(array, property) : this.filterByValue(array)

	filterByValue(array) {
		return Array.from(new Set(array));
	}

	filterByProperty(array, itemProperty) {
		return Array.from(new Set(array.map(item => item[itemProperty])));
	}

	createSchemaObject(questionsArray) {
		var threadNames = questionsArray.map(a => a.threadName)
					  											 .filter(this.unique);

		var subThreadNames = threadNames.map( a => {
     var allSubheaders = questionsArray.filter(b => b.threadName == a)
     var subThreadNames = this.filterUnique(allSubheaders, "subThreadName")
         .map(sName => {
           var questions = questionsArray.filter(m => m.subThreadName == sName);
           var mrLevels = this.filterByProperty(questions, "mrLevel");
           var a = mrLevels.map(f => {
             var criteriaSet = questions.filter(s => s.mrLevel == f)
                .map(a => ({ text: a.criteriaText }))
                return {mrl: f, criteriaSet: criteriaSet}
           })
         return {subheader: sName, questions: a};
         });


     return {header: a, subheader: subThreadNames};
   })
     return subThreadNames
   }


  changeState(segment){
		segment.cool = !segment.cool
    // this.state[index] = !this.state[index];
  }
  changeSubState(sub){
		sub.sweet = !sub.sweet
//    this.subState[index][subIndex] = !this.subState[index][subIndex];
  }

	filterTheList() {
		console.log("in filterthelist")
		console.log(this.filterList.filterMRL);

		if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
			var filteredQuestions = this.allQuestions.filter(question => question.mrLevel == this.filterList.filterMRL);
			this.filteredSchema = this.createSchemaObject(filteredQuestions);
			console.log(this.filteredSchema);
		} else {
			this.filteredSchema = this.createSchemaObject(this.allQuestions);
		}

	}

	clearFilter() {
			this.filterList.filterMRL = 0;
			this.filterTheList();
		}

	expandAllThreads() {
		this.showAll = !this.showAll;
	}

}
