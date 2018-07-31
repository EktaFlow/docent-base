import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewsComponent } from '../../components/views/views';

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

  schema =[
    {
      header:"Technology Maturity",
      subheader:[
        {
          subheader:"Technology Maturity",
          questions:[
            {
              mrl:"MRL 1",
              questionSet:[
                "Is the Technology Readiness at TRL 1 or greater?",
              ]
            },
            {
              mrl:"MRL 2",
              questionSet:[
                "Is the Technology Readiness at TRL 2 or greater?",
              ]
            },
            {
              mrl:"MRL 3",
              questionSet:[
                "Is the Technology Readiness at TRL 3 or greater?",
              ]
            }
          ]
        }
      ],
    },
    {
      header:"Technology & Industrial Base",
      subheader:[
        {
          subheader:"Industrial Base",
          questions:[
            {
              mrl:"MRL 3",
              questionSet:[
                "Test Question One",
                "Two",
                "Three"
              ]
            }
          ]
        },
        {
          subheader:"Manufacturing Technology Developement",
          questions:[
            {
              mrl:"MRL 2",
              questionSet:[
                "Have new manufacturing concepts and potential solutions been identified?"
              ]
            }
          ]
        }
      ]
    }
  ];

  state: any = [this.schema.length]
  subState: any = [this.schema.length];
  

	constructor( private apollo: Apollo, 
							 public navCtrl: NavController, 
							 public navParams: NavParams, 
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
		console.log(this.assessmentId);
    this.state.fill(false);
    this.create();
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
																                           .map(a => a.questionText)
																			return {mrl: f, questionSet: questionSet}
																	})
																	return {subheader: sName, questions: a};
															});


		return {header: a, subheader: subThreadNames};
	})
		return subThreadNames
	}


  changeState(index){
    this.state[index] = !this.state[index];
  }
  changeSubState(index,subIndex){
    this.subState[index][subIndex] = !this.subState[index][subIndex];
  }

  create(){
    // Method to create states for sub headers
    for(var i=0; i<this.schema.length; i+=1){
      var newArr: any = [this.schema[i].subheader.length];
      newArr.fill(false);
      this.subState[i] = new Array(this.schema[i].subheader.length);
    }
  }

  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }
}
