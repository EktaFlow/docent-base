import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewsComponent } from '../../components/views/views';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  
  targetMRL: any;
  date: any;
  location: any;
  team: any;
  survey: any;
  surveyResults: any;
  reviewResults = [];
  response;
  questions = [
    {
      question:"what the heck come after 6?",
      title: "q1",
      answer:"Yes",
    },
    {
      question:"what the heck come after 6?",
      title: "q2",
      answer:"No"
    },
    {
      question:"what the heck come after 6?",
      title: "q3",
      answer:"N/A",
    },
    {
      question:"what the heck come after 6?",
      title: "q4",
      answer:"skipped"
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popOver: PopoverController) {
    // OLD CODE IS OLD
    /*
    this.targetMRL = navParams.get('mrl');
    this.date = navParams.get('date');
    this.location = navParams.get('location');
    this.survey = navParams.get('survey');
    this.surveyResults = navParams.get('surveyResults');
    this.response = navParams.get('response');
    */
    // This will initialize the JSON object used to create the view. Skipped questions are NOT stored
    // in SurveyJS, so this will combat that.
    /*
    for(var i =0; i < this.survey.pages.length; i+=1){
      if(!this.surveyResults[this.survey.pages[i].elements[0].name]){
        this.surveyResults[this.survey.pages[i].elements[0].name] = "skipped";
      }
    }
    */
    // The key value pairs are put in an array so we can use ngFor
    /*
    for(let key in this.surveyResults){
      console.log(key + " " + this.surveyResults[key])
      this.reviewResults.push({key: this.surveyResults[key]});
    }*/
    // END OLD CODe
    
  }
  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }
}
