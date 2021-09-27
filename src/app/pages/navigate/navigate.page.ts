import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { Router, ActivatedRoute } from "@angular/router";

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
        answers {
          answer
        }
      }
    }
  }
`;
@Component({
  selector: "navigate",
  templateUrl: "./navigate.page.html",
  styleUrls: ["./navigate.page.scss"],
})
export class NavigatePage implements OnInit {
  allQuestions: any;
  assessmentId: any;
  schema: any;
  showAll: any = false;
  filterList: any = {};
  filteredSchema: any;
  expandAllFromQs: any = false;
  targetLevel: any;
  mrlArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  autoFilter: any = true;
  pageName: any = "Questions List";

  constructor(
    private apollo: Apollo,
    public popOver: PopoverController,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assessmentId = activatedRoute.snapshot.paramMap.get("assessmentId");
    this.expandAllFromQs = activatedRoute.snapshot.paramMap.get(
      "expandAllFromQs"
    );
    this.autoFilter = activatedRoute.snapshot.paramMap.get("autoFilter");
  }

  // helper function to pull unique values from array.
  unique = (item, index, array) => array.indexOf(item) == index;

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("navigate");
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: assessmentQuery,
        variables: { _id: this.assessmentId },
        fetchPolicy: "network-only",
      })
      .valueChanges.subscribe((data) => {
        this.allQuestions = (<any>data.data).assessment.questions;
        this.targetLevel = (<any>data.data).assessment.targetMRL;
        this.schema = this.createSchemaObject(this.allQuestions);
        this.filteredSchema = this.createSchemaObject(this.allQuestions);
        this.filteredSchema = this.filteredSchema.filter(
          (s) => s.header.length > 1
        );

        // filterTheList();
        //this.state.fill(false);
        //    			this.create();

        if (this.autoFilter) {
          this.filterList.filterMRL = this.targetLevel;
          this.filterTheList();
        }
      });

    if (this.expandAllFromQs) {
      this.expandAllThreads();
    }
  }

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

  createSchemaObject(questionsArray) {
    var threadNames = questionsArray
      .map((a) => a.threadName)
      .filter(this.unique);

    var subThreadNames = threadNames.map((a) => {
      var allSubheaders = questionsArray.filter((b) => b.threadName == a);
      var subThreadNames = this.filterUnique(
        allSubheaders,
        "subThreadName"
      ).map((sName) => {
        var questions = questionsArray.filter((m) => m.subThreadName == sName);
        var mrLevels = this.filterByProperty(questions, "mrLevel");
        var a = mrLevels.map((f) => {
          var questionSet = questions
            .filter((s) => s.mrLevel == f)
            .map((a) => ({
              text: a.questionText,
              questionId: a.questionId,
              questionStatus: this.findQStatus(a.answers, a.mrLevel, a),
              latestAnswer: a.answers[a.answers.length - 1]
            }));
            
          return { mrl: f, questionSet: questionSet };
        });
        return { subheader: sName, questions: a };
      });

      return { header: a, subheader: subThreadNames };
    });
    return subThreadNames;
  }

  filterTheList() {
    var filtered = this.schema.map((thread) => {
      return thread.subheader.map((subthread) => {
        return subthread.questions.filter(
          (question) => question.questionSet[0].latestAnswer !== undefined ?  question.mrl == this.filterList.filterMRL && question.questionSet[0].latestAnswer.answer == this.filterList.filterAnswer : question.mrl == this.filterList.filterMRL
          
          
          
          // question.mrl == this.filterList.filterMRL && question.questionSet[0].latestAnswer.answer == this.filterList.filterAnswer
          
        );
      });
      return thread;
    });

    if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
      var filteredQuestions = this.allQuestions.filter(
        (question) => question.mrLevel == this.filterList.filterMRL && question.currentAnswer == this.filterList.filterAnswer 
      );
      this.filteredSchema = this.createSchemaObject(filteredQuestions);
    } else {
      this.filteredSchema = this.createSchemaObject(this.allQuestions);
    }
  }

  expandAllThreads() {
    this.showAll = !this.showAll;
  }

  clearFilter() {
    this.filterList.filterMRL = 0;
    this.filterTheList();
  }

  changeState(segment) {
    segment.cool = !segment.cool;
    // this.state[index] = !this.state[index];
  }
  changeSubState(sub) {
    sub.sweet = !sub.sweet;
    //    this.subState[index][subIndex] = !this.subState[index][subIndex];
  }

  navToQuestion(questionId) {
    this.router.navigate([
      "/questions",
      { assessmentId: this.assessmentId, questionId: questionId },
    ]);
  }

  findQStatus(answers, mrLevel, question) {
    var filteredAnswers = answers.filter((a) => a.answer != null);
    if (filteredAnswers.length == 0 && mrLevel == this.targetLevel) {
      return "Unanswered";
    } else if (
      (filteredAnswers.length == 0 && mrLevel != this.targetLevel) ||
      filteredAnswers == null
    ) {
      return null;
    } else {
      var currentAnswer = filteredAnswers[filteredAnswers.length - 1];
    }

    if (currentAnswer.answer == "Yes") {
      return "Yes";
    } else if (currentAnswer.answer == "No") {
      return "No";
    } else if (currentAnswer.answer == "N/A") {
      return "N/A";
    } else if (currentAnswer.answer == null) {
      return "Unanswered";
    } else {
      return null;
    }
  }

  pickColor(status) {
    var status = status.toLowerCase();
    if (status == "yes") {
      return "secondary";
    } else if (status == "no") {
      return "danger";
    } else if (status == "n/a") {
      return "buttonBlue";
    } else {
      return "primary";
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
