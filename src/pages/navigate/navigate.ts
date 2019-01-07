// TODO: make the schema a much simpler data structure.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


import { QuestionsPage } from '../questions/questions';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	targetMRL
	questions {
		mrLevel
		threadName
		questionText
		subThreadName
		questionId
		currentAnswer
	}
	}
}
`

@IonicPage()
@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html',
})


export class NavigatePage {

	allQuestions: any;
	assessmentId: any;
 	schema: any;
	showAll: any = false;
	filterList: any = {};
	filteredSchema: any;
	expandAllFromQs: any = false;
	targetLevel: any;
	mrlArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	autoFilter: false;
	pageName: any = "Navigate";

	constructor( private apollo: 			 Apollo,
							 public navCtrl: 			 NavController,
							 public navParams: 		 NavParams,
							 public popOver: 			 PopoverController,
							 ) {

		this.assessmentId = navParams.data.assessmentId;
		this.expandAllFromQs = navParams.data.expandAllFromQs;
		this.autoFilter = navParams.data.autoFilter;
  }

  // helper function to pull unique values from array.
	unique = (item, index, array) => array.indexOf(item) == index

	ionViewWillEnter() {
    GoogleAnalytics.trackPage("navigate");
  }

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
					this.allQuestions = (<any>data.data).assessment.questions;
					this.targetLevel = (<any>data.data).assessment.targetMRL;
					this.schema = this.createSchemaObject(this.allQuestions);
					this.filteredSchema = this.createSchemaObject(this.allQuestions);
					// filterTheList();

					console.log(this.allQuestions);
					console.log(this.schema);
    			//this.state.fill(false);
//    			this.create();

					if (this.autoFilter){
						this.filterList.filterMRL = this.targetLevel;
						this.filterTheList();
					}
			});

			if (this.expandAllFromQs) {
				this.expandAllThreads();
			}


	}

	filterUnique = (array, property=null) => property ? this.filterByProperty(array, property) : this.filterByValue(array)

	filterByValue(array) {
		return Array.from(new Set(array));
	}

	filterByProperty(array, itemProperty) {
		return Array.from(new Set(array.map(item => item[itemProperty])));
	}

	createSchemaObject(questionsArray) {
		console.log("im in heree")
	var threadNames = questionsArray.map(a => a.threadName)
					  											 .filter(this.unique);

	var subThreadNames = threadNames.map( a => {
		var allSubheaders = questionsArray.filter(b => b.threadName == a)
		var subThreadNames = this.filterUnique(allSubheaders, "subThreadName")
				.map(sName => {
					var questions = questionsArray.filter(m => m.subThreadName == sName);
					var mrLevels = this.filterByProperty(questions, "mrLevel");
					var a = mrLevels.map(f => {
						var questionSet = questions.filter(s => s.mrLevel == f)
						   .map(a => ({ text: a.questionText, questionId: a.questionId, questionStatus: this.findQStatus(a.currentAnswer, a.mrLevel) }));
							 return {mrl: f, questionSet: questionSet}
					})
				return {subheader: sName, questions: a};
				});


		return {header: a, subheader: subThreadNames};
	})
		return subThreadNames
	}

	filterTheList() {
		// var filtered = this.schema.map((thread) => {
		// 	return thread.subheader.map((subthread) => {
		// 		return subthread.questions.filter(question => question.mrl == this.filterList.filterMRL);
		// 	});
		// 	return thread;
		// });
		console.log("in filterthelist")
		console.log(this.filterList.filterMRL);

		if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
			var filteredQuestions = this.allQuestions.filter(question => question.mrLevel == this.filterList.filterMRL);
			this.filteredSchema = this.createSchemaObject(filteredQuestions);
			console.log(this.filteredSchema);
		} else {
			this.filteredSchema = this.createSchemaObject(this.allQuestions);
		}


		console.log("post")
		// console.log(filtered);
		// this.filteredSchema = filtered;
	}

	clearFilter() {
		this.filterList.filterMRL = 0;
		this.filterTheList();
	}

expandAllThreads() {
	this.showAll = !this.showAll;
}

  changeState(segment){
		segment.cool = !segment.cool;
    // this.state[index] = !this.state[index];
  }
  changeSubState(sub){
		sub.sweet = !sub.sweet;
//    this.subState[index][subIndex] = !this.subState[index][subIndex];
  }

	navToQuestion(questionId) {
		this.navCtrl.push(QuestionsPage, {
			assessmentId: 			this.assessmentId,
			questionId: questionId
		});
	}

	findQStatus(currentAnswer, mrLevel){
		if (currentAnswer == "Yes") {
			return "Correct"
		} else if (currentAnswer == "No") {
			return "Incorrect"
		} else if (currentAnswer == "N/A") {
			return "N/A"
		} else if (mrLevel == this.targetLevel){
				return "Unanswered"
		} else {
			return null
		}
	}

	pickColor(status){
		var status = status.toLowerCase();
		if (status == "correct"){
			return "secondary"
		} else if (status == "incorrect"){
			return "danger"
		} else if (status == "n/a"){
			return "buttonBlue"
		} else {
			return "primary"
		}
	}




	/*
  create(){
    // Method to create states for sub headers
    for(var i=0; i<this.schema.length; i+=1){
      var newArr: any = [this.schema[i].subheader.length];
      newArr.fill(false);
      this.subState[i] = new Array(this.schema[i].subheader.length);
    }
  }
  */

}
