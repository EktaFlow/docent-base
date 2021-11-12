import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { Router, ActivatedRoute } from "@angular/router";
import * as XLSX from "xlsx";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
  query assessment($_id: String) {
    assessment(_id: $_id) {
      targetMRL
      targetDate
      location
      questions {
        questionId
        mrLevel
        questionText
        threadName
        subThreadName
        currentAnswer
       
        answers {
          answer
          notesNo
          objectiveEvidence
        }
      }
    }
  }
`;

/*
 files {
          name
          questionId
          url
        }

*/ 


@Component({
  selector: "review",
  templateUrl: "./review.page.html",
  styleUrls: ["./review.page.scss"],
})
export class ReviewPage implements OnInit {
  assessmentId: any;
  answeredQuestions: any[] = [];
  unansweredQuestions: any[] = [];
  allAnswered: any[] = [];
  allUnanswered: any[] = []; 
  allQuestions: any;
  yesQuestions: any;
  noQuestions: any;
  naQuestions: any;
  targetMRL: any;
  targetDate: any;
  location: any;
  team: any;
  survey: any;
  surveyResults: any;
  reviewResults = [];
  pageName: any = "Review";
  response;
  files;
  filterList: any = {};
  unfilteredQuestions: any;
  autoFilter = true;

  constructor(
    private apollo: Apollo,
    public popOver: PopoverController,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assessmentId =
      this.activatedRoute.snapshot.paramMap.get("assessmentId");
    // this.autoFilter = this.activatedRoute.snapshot.paramMap.get('autoFilter');
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("review");
  }

  goToQuestion(questionId) {
    this.router.navigate([
      "/questions",
      { data: this.assessmentId, questionId: questionId },
    ]);
  }

  // unique = (item, index, array) => array.indexOf(item) == index

  openFile(url) {
    window.open(url, "new_window");
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: assessmentQuery,
        variables: { _id: this.assessmentId },
        fetchPolicy: "network-only",
      })
      .valueChanges.subscribe((data) => {
        var assessment = (<any>data.data).assessment;

        var questions = assessment.questions;
        this.allQuestions = questions 
        const gleesh = (<any>data.data).assessment.targetMRL;
        const demo = questions.filter((q) => q.answers.length > 0);
        const feech = demo.filter((a) => a.mrLevel === gleesh);
        const undemo = questions.filter((q) => q.answers.length === 0);
        const mana = undemo.filter((a) => a.mrLevel === gleesh);
        this.answeredQuestions = feech;
        this.unansweredQuestions = mana;
        this.allAnswered = demo
        this.allUnanswered = undemo 

        this.yesQuestions = this.allAnswered.filter(question => question.currentAnswer === 'Yes')
        this.noQuestions = this.allAnswered.filter(question => question.currentAnswer === 'No')
        this.naQuestions = this.allAnswered.filter(question => question.currentAnswer === 'N/A')


        var answeredQuestions = [];
        questions.forEach((q) => {
          if (q.answers.length > 0 && q.answers[q.answers.length - 1].answer) {
            var drilledQuestion = {
              questionId: q.questionId,
              questionText: q.questionText,
              currentAnswer: q.answers[q.answers.length - 1].answer,
              objectiveEvidence:
                q.answers[q.answers.length - 1].objectiveEvidence,
              level: q.mrLevel,
              subThreadName: q.subThreadName,
              threadName: q.threadName,
            };
            answeredQuestions.push(drilledQuestion);
          }
        });

        if (this.autoFilter) {
          this.filterList.filterMRL = assessment.targetMRL;
          this.allQuestions = answeredQuestions.filter((question) => {
            if (question.level == assessment.targetMRL) {
              return question;
            }
          });
        } else {
          this.allQuestions = answeredQuestions;
        }
        // all questions is an array of answered questions.
        // preserving the names to leave markup the same.
        this.unfilteredQuestions = answeredQuestions;
        this.targetMRL = assessment.targetMRL;
        this.targetDate = assessment.targetDate;
        this.location = assessment.location;

        let questionsWithFiles = assessment.questions.filter(
          (q) => q.files.length > 0
        );

        let storage = questionsWithFiles.map((q) => {
          q.files.filter((f) => f.length > 0);
        });

        this.files = storage;
      });
    console.log("this", this);
  }

  checkUnanswered() {
    this.filterList.filterMRL === 'All Levels'
    ? this.allQuestions = this.allUnanswered
    : this.allQuestions = this.allUnanswered.filter(question => question.mrLevel === this.filterList.filterMRL)
    return this.allQuestions 
  }

  checkAnswered() {
    this.filterList.filterMRL === 'All Levels'
    ? this.allQuestions = this.allAnswered
    : this.allQuestions = this.allUnanswered.filter(question => question.mrLevel === this.filterList.filterMRL)
    return this.allQuestions 
  }

  checkAnsweredByType(type, level){
    if (level === 'All Levels') {
      if (type === 'Yes') {
        return this.allQuestions === this.yesQuestions
      }
      else if (type === 'No') {
        return this.allQuestions === this.noQuestions
      }
      else return this.allQuestions === this.naQuestions 
    }

    else {
      if (type === 'Yes') {
        return this.allQuestions = this.yesQuestions.filter(question => question.mrLevel === level)
      }
      else if (type === 'No') {
        return this.allQuestions = this.noQuestions.filter(question => question.mrLevel === level)
      }
      else {
        return this.allQuestions = this.naQuestions.filter(question => question.mrLevel === level)
      }
    }

  }

  filterTheList() {
      //  *all* unanswered questions || *current mrl* unanswered questions
      if (this.filterList.filterAnswer === 'Unanswered') {
        return this.checkUnanswered()
      }
      //  *all* answered question }} *current mrl* answered questions
      else if (this.filterList.filterAnswer === 'Answered') {
        return this.checkAnswered()
      } // *all specific answer type* questions || *current mrl specifc answer type* questions
      else if (
        this.filterList.filterAnswer === 'Yes' ||
        this.filterList.filterAnswer === 'No' ||
        this.filterList.filterAnswer === 'N/A'
      ) {
        return this.checkAnsweredByType(this.filterList.filterAnswer, this.filterList.filterMRL)
      }
      else {
          this.allQuestions = [...this.unfilteredQuestions, ...this.unansweredQuestions];
      }
  }

  clearFilter() {
    let storage = [];
    storage = [...this.unfilteredQuestions, ...this.unansweredQuestions];
    this.filterList.filterMRL = 0;
    this.filterList.filterAnswer = "";
    this.allQuestions = storage;
    console.log(this.allQuestions)
    this.filterTheList();
  }

  saveXLS() {
    var headers = [
      "MRL",
      "Question Text",
      "Current Answer",
      "Objective Evidence",
    ];

    var values = this.unfilteredQuestions.map((q) => {
      return [q.level, q.questionText, q.currentAnswer, q.objectiveEvidence];
    });

    var worksheet = [headers, ...values];

    var ws = XLSX.utils.aoa_to_sheet(worksheet);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Review Page");

    /* save to file */
    XLSX.writeFile(wb, "review.xlsx");
  }
}