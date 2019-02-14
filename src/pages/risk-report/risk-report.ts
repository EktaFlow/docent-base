import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
          deskbookVersion
          name
		      teamMembers {
            name
            email
            role
          }
	        targetMRL
	        targetDate
	        location
          scope
        	questions {
        		mrLevel
        		questionText
        		threadName
        		subThreadName
        		currentAnswer
        		questionId
            answers {
                answer
                notesNo
                notesYes
                notesNA
	        	    likelihood
                consequence
                greatestImpact
                riskResponse
                mmpSummary
            }
    	   }
	  }
}
`

/**
 * Generated class for the RiskReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-risk-report',
  templateUrl: 'risk-report.html',
})
export class RiskReportPage {

  assessmentId: any;
  pageName: any = "Detailed Risk Report";
  schema: any;
  targetMRL: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.assessmentId = navParams.data.assessmentId;
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("RiskReport");
  }

  async ngOnInit(){
    this.apollo.watchQuery({
      query: assessmentQuery,
      variables: {_id: this.assessmentId},
      fetchPolicy: "network-only"
      }).valueChanges
      .subscribe(data => {
        var assessment = (<any>data.data).assessment;
        var questions = assessment.questions.filter(q => q.mrLevel == assessment.targetMRL);
        this.targetMRL = assessment.targetMRL;
        var extraQuestions = assessment.questions.filter(q => q.answers.length > 0);
        for (let question of extraQuestions){
          question = question.answers.filter(a => a.answer == null);
        }
        extraQuestions = extraQuestions.filter(q => q.mrLevel != assessment.targetMRL);

        this.schema = this.createSchemaObject(questions);
        this.nonLevelSchema = this.createSchemaObject(extraQuestions);
      });
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
     						   .map(a => ({ text: a.questionText, questionId: a.questionId, mrl: a.mrLevel,latestAnswer: a.answers[a.answers.length - 1] }));
     							 return {mrl: f, questionSet: questionSet}
     					})
     				return {subheader: sName, questions: a};
     				});


     		return {header: a, subheader: subThreadNames};
     	})
		return subThreadNames
	}

  filterUnique = (array, property=null) => property ? this.filterByProperty(array, property) : this.filterByValue(array)

  filterByValue(array) {
    return Array.from(new Set(array));
  }

  filterByProperty(array, itemProperty) {
    return Array.from(new Set(array.map(item => item[itemProperty])));
  }

  unique = (item, index, array) => array.indexOf(item) == index

  public calculateRiskScore(latestAnswer) {

    // preventing off by one errors, with nulls.
    // values should always be 1-5
    var riskMatrix = [
      [ null ],
      [ null, 1, 3,  5,  8,  12],
      [ null, 2, 7,  11, 14, 17],
      [ null, 4, 10, 15, 19, 21],
      [ null, 6, 12, 18, 22, 24],
      [ null, 9, 16, 20, 23, 25]
    ];

    // typescript -_-
    var likelihood = (<any>latestAnswer).likelihood;
    var consequence = (<any>latestAnswer).consequence;

    if ( likelihood && consequence ) {

      // value is the same as the index, b/c we put nulls in the matrix
      var likelihoodIndex  = Number(likelihood);
      var consequenceIndex = Number(consequence);

      // var name = selectedBox.className.replace(/ selected/g, '')
      // selectedBox.className = `${name} selected`;

      return riskMatrix[likelihoodIndex][consequenceIndex];
    } else {
      return " ";
    }
  }

  public pickRiskColor(latestAnswer){
    var riskScore = this.calculateRiskScore(latestAnswer);
    if (riskScore >= 1 && riskScore <= 11) {
      return "green"
    } else if (riskScore >= 12 && riskScore <= 19) {
      return "#e2d706"
    } else if (riskScore >= 20 && riskScore <= 25){
      return "red"
    }
  }

}
