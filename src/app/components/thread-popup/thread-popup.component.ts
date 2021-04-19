import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, PopoverController } from "@ionic/angular";
import { AssessmentService } from "../../services/assessment.service";
import { Apollo } from "apollo-angular";
import { Router } from "@angular/router";
import gql from "graphql-tag";

var assessmentQuery = gql`
  query assessment($_id: String!) {
    assessment(_id: $_id) {
      questions {
        threadName
        subThreadName
        questionText
        questionId
        mrLevel
      }
      targetMRL
    }
  }
`;
@Component({
  selector: "thread-popup",
  templateUrl: "./thread-popup.component.html",
  styleUrls: ["./thread-popup.component.scss"],
})
export class ThreadPopupComponent implements OnInit {
  //vars
  public targetMRL: any;
  public questions: any;
  public currentQuestions: any;
  public assessmentId: any;
  public subTitle: any;
  public schema: any;
  public updateInfo: any;
  constructor(
    private apollo: Apollo,
    public navCtrl: NavController,
    public navParams: NavParams,
    private assessmentService: AssessmentService,
    public router: Router,
    private popOver: PopoverController
  ) {
    this.assessmentId = navParams.data.assessmentId;
    this.subTitle = navParams.data.subTitle;
    this.updateInfo = navParams.data.updateInfo;
  }

  ngOnInit() {
    this.assessmentId ? this.getAssessmentData() : null;
    var styling = `
	 width: 300px;
	 `;
    var test = document.getElementsByClassName("popover-content");

    var newVar = test[test.length - 1] as HTMLElement;
    newVar.style.cssText = styling;

    //i need to create an object that is like the ugly object in navigate to get the thread names and subthread names and their linkage
  }

  getAssessmentData() {
    this.apollo
      .watchQuery<any>({
        query: assessmentQuery,
        variables: {
          _id: this.assessmentId,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.targetMRL = data.assessment.targetMRL;
        this.questions = data.assessment.questions;
        this.schema = this.createThreadsObject(this.questions);
        // this.schema = this.myFunction(this.questions);
      });
  }

  myFunction(questions) {}

  unique = (item, index, array) => array.indexOf(item) == index;

  filterUnique = (array, property = null) =>
    property
      ? this.filterByProperty(array, property)
      : this.filterByValue(array);
  filterByValue(array) {
    return Array.from(new Set(array));
  }

  filterByProperty(array, itemProperty) {
    return Array.from(new Set(array.map((item) => item[itemProperty])));
  }

  createThreadsObject(questionsArray) {
    var filteredQuestions = questionsArray.filter(
      (question) => question.mrLevel == this.targetMRL
    );

    var threadNames = filteredQuestions
      .map((a) => a.threadName)
      .filter(this.unique);
    var subThreadNames = threadNames.map((a) => {
      var allSubheaders = filteredQuestions.filter((b) => b.threadName == a);
      var subThreadNames = this.filterUnique(
        allSubheaders,
        "subThreadName"
      ).map((sName) => {
        var questions = filteredQuestions.filter(
          (m) => m.subThreadName == sName
        );
        var mrLevels = this.filterByProperty(questions, "mrLevel");
        var a = mrLevels.map((f) => {
          var questionSet = questions
            .filter((s) => s.mrLevel == f)
            .map((a) => ({ questionId: a.questionId }));
          return { mrl: f, questionSet: questionSet };
        });
        return { subheader: sName, questions: a };
      });

      return { header: a, subheader: subThreadNames };
    });
    return subThreadNames;
  }

  changeState(thread) {
    thread.open = !thread.open;
    // this.state[index] = !this.state[index];
  }

  navToQuestionFromSchema(questionsArray) {
    // var correctQsByMRL = questionsArray.filter(q => q.mrl == this.targetMRL);
    this.navToQuestion(questionsArray[0].questionSet[0].questionId);
  }

  async navToQuestion(questionId) {
    this.router.navigate([
      "/questions",
      { assessmentId: this.assessmentId, questionId: questionId },
    ]);
    this.popOver.dismiss();
    // this.navCtrl.push(QuestionsPage, {assessmentId: this.assessmentId, questionId: questionId});
    // var update = await this.assessmentService.updateQuestion(this.updateInfo);
    // update.subscribe(data => this.navCtrl.push(QuestionsPage, {
    // 	assessmentId: 			this.assessmentId,
    // 	questionId: questionId
    // }));
  }
}
