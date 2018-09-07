// TODO: make the schema a much simpler data structure.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";

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

	constructor( private apollo: 			 Apollo,
							 public navCtrl: 			 NavController,
							 public navParams: 		 NavParams,
							 public popOver: 			 PopoverController,
							 ) {

		this.assessmentId = navParams.data.assessmentId;
  }

  // helper function to pull unique values from array.
	unique = (item, index, array) => array.indexOf(item) == index

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
					this.allQuestions = (<any>data.data).assessment.questions;
					this.schema = this.createSchemaObject(this.allQuestions);
					console.log(this.schema);
    			//this.state.fill(false);
//    			this.create();
			});
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
						var questionSet = questions.filter(s => s.mrLevel == f)
						   .map(a => ({ text: a.questionText, questionId: a.questionId }))
							 return {mrl: f, questionSet: questionSet}
					})
				return {subheader: sName, questions: a};
				});


		return {header: a, subheader: subThreadNames};
	})
		return subThreadNames
	}

expandAllThreads() {
	console.log("hellooo");
	this.showAll = !this.showAll;
	console.log(this.showAll);
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
			data: 			this.assessmentId,
			questionId: questionId
		});
	}

fitlerTheList() {
	console.log(this.filterList);
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
