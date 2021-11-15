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
  answeredQuestions: any[] = [];
  unansweredQuestions: any[] = [];
  allAnswered: any[] = [];
  allUnanswered: any[] = [];
  allQuestions: any;
  yesQuestions: any;
  noQuestions: any;
  naQuestions: any;
  currentQuestions: any;
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
    this.expandAllFromQs =
      activatedRoute.snapshot.paramMap.get("expandAllFromQs");
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
        const gleesh = (<any>data.data).assessment.targetMRL;
        this.allQuestions = (<any>data.data).assessment.questions;
        const demo = this.allQuestions.filter((q) => q.answers.length > 0);
         // allAnswered = demo, when 'All Answered' is chosen, this.allQuestions = this.allAnswered

        const feech = demo.filter((a) => a.mrLevel === gleesh); // get all answered questions for current mrl
        const undemo = this.allQuestions.filter((q) => q.answers.length === 0); // get all unanswered questions, when 'Unanswered' is chosen, this.allQuestions = this.undemo
        const mana = undemo.filter((a) => a.mrLevel === gleesh);
        this.answeredQuestions = feech;
        this.unansweredQuestions = mana;
        this.allAnswered = [...demo, ...undemo]
        this.allUnanswered = undemo;
        this.currentQuestions = [...feech, ...mana]
        this.yesQuestions = this.allAnswered.filter(question => question.currentAnswer === 'Yes')
        this.noQuestions = this.allAnswered.filter(question => question.currentAnswer === 'No')
        this.naQuestions = this.allAnswered.filter(question => question.currentAnswer === 'N/A')
        this.targetLevel = (<any>data.data).assessment.targetMRL;
        this.schema = this.createSchemaObject(this.allQuestions); //this.allQuestions
        this.filteredSchema = this.createSchemaObject(this.allQuestions); //this.allQuestions
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
    console.log('this', this)
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
              latestAnswer: a.answers[a.answers.length - 1],
            }));

          return { mrl: f, questionSet: questionSet };
        });
        return { subheader: sName, questions: a };
      });

      return { header: a, subheader: subThreadNames };
    });
    return subThreadNames;
  }

  checkUnanswered() {
    this.filterList.filterMRL === 'All Levels'
    ? this.filteredSchema = this.createSchemaObject(this.allUnanswered)
    : this.filteredSchema = this.createSchemaObject(this.allUnanswered.filter(question => question.mrLevel == this.filterList.filterMRL))
    return this.filteredSchema
  }

  checkAnswered() {
    this.filterList.filterMRL === 'All Levels'
    ? this.filteredSchema = this.createSchemaObject(this.allAnswered)
    : this.filteredSchema = this.createSchemaObject(this.allAnswered.filter((question) => {
      if (question.mrLevel == this.filterList.filterMRL) {
        return question
      }
    }))
    return this.filteredSchema
  }

  checkAnsweredByType(type, level){
    if (level === 'All Levels') {
      if (type === 'Yes') {
        return this.filteredSchema = this.createSchemaObject(this.yesQuestions)
      }
      else if (type === 'No') {
        return this.filteredSchema = this.createSchemaObject(this.noQuestions)
      }
      else return this.filteredSchema = this.createSchemaObject(this.naQuestions) 
    }

    else {
      if (type === 'Yes') {
        return this.filteredSchema = this.createSchemaObject(this.yesQuestions.filter(question => question.mrLevel == level))
      }
      else if (type === 'No') {
        return this.filteredSchema = this.createSchemaObject(this.noQuestions.filter(question => question.mrLevel == level))
      }
      else {
        return this.filteredSchema = this.createSchemaObject(this.naQuestions.filter(question => question.mrLevel == level))
      }
    }

  }


  filterTheList() {

    var filtered = this.schema.map((thread) => {
      return thread.subheader.map((subthread) => {
        return subthread.questions.filter(
          (question) =>
            question.questionSet[0].latestAnswer !== undefined
              ? question.mrl == this.filterList.filterMRL &&
                question.questionSet[0].latestAnswer.answer ==
                  this.filterList.filterAnswer
              : question.mrl == this.filterList.filterMRL

          // question.mrl == this.filterList.filterMRL && question.questionSet[0].latestAnswer.answer == this.filterList.filterAnswer
        );
      });
      return thread;
    });
         //  *all* unanswered questions || *current mrl* unanswered questions
         if (this.filterList.filterAnswer === 'Unanswered') {
          return this.checkUnanswered()
        }
        //  *all* answered question }} *current mrl* answered questions
        else if (this.filterList.filterAnswer === 'All') {
          return this.checkAnswered()
        } 
        // *all specific answer type* questions || *current mrl specifc answer type* questions
        else if (
          this.filterList.filterAnswer === 'Yes' ||
          this.filterList.filterAnswer === 'No' ||
          this.filterList.filterAnswer === 'N/A'
        ) {
          return this.checkAnsweredByType(this.filterList.filterAnswer, this.filterList.filterMRL)
        }
        else {
            this.filterList.filterMRL ? this.filteredSchema = this.createSchemaObject(this.currentQuestions) : this.filteredSchema = this.createSchemaObject(this.allQuestions)
        }
  }

  expandAllThreads() {
    this.showAll = !this.showAll;
  }

  clearFilter() {
    this.filterList.filterMRL = 0;
    this.filterList.filterAnswer = "";
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