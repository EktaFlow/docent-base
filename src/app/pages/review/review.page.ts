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
      files {
        name
        questionId
        url
      }
    }
  }
`;
@Component({
  selector: "review",
  templateUrl: "./review.page.html",
  styleUrls: ["./review.page.scss"],
})
export class ReviewPage implements OnInit {
  assessmentId: any;
  allQuestions: any;
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
    this.assessmentId = this.activatedRoute.snapshot.paramMap.get(
      "assessmentId"
    );
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
        this.files = assessment.files;
      });
  }

  filterTheList() {
    if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
      var filteredQuestions = this.unfilteredQuestions.filter((question) => {
        if (question.level == this.filterList.filterMRL && question.currentAnswer == this.filterList.filterAnswer) {
          return question;
        }
      });
      this.allQuestions = filteredQuestions;
    } else {
      this.allQuestions = this.unfilteredQuestions;
    }
  }

  clearFilter() {
    this.filterList.filterMRL = 0;
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
