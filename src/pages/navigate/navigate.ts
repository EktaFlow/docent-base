import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Question } from 'survey-angular';

/**
 * Generated class for the NavigatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html',
})



export class NavigatePage {

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.state.fill(false);
    this.create();
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

  getQuestion(){

  }
}
