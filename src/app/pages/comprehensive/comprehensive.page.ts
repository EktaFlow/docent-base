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
          objectiveEvidence
          assumptionsYes
          notesYes
          greatestImpact
          riskResponse
          mmpSummary
          likelihood
          consequence
          risk
          who
          when
          what
          reason
          assumptionsNo
          notesNo
          documentation
          assumptionsNA
          notesNA
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
  selector: "comprehensive",
  templateUrl: "./comprehensive.page.html",
  styleUrls: ["./comprehensive.page.scss"],
})
export class ComprehensivePage implements OnInit {
  assessmentId: any;
  allQuestions: any;
  targetMRL: any;
  targetDate: any;
  location: any;
  team: any;
  survey: any;
  surveyResults: any;
  comprehensiveResults = [];
  pageName: any = "Comprehensive Report";
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
    GoogleAnalytics.trackPage("comprehensive");
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
            var latestA = q.answers[q.answers.length - 1];
            // console.log(latestA);
            var drilledQuestion = {
              questionId: q.questionId,
              questionText: q.questionText,
              currentAnswer: latestA.answer,
              objectiveEvidence: latestA.objectiveEvidence ? latestA.objectiveEvidence : "No Objective Evidence Given",
              level: q.mrLevel,
              subThreadName: q.subThreadName,
              threadName: q.threadName,
              assumptionsYes: latestA.assumptionsYes ? latestA.assumptionsYes : "No Assumptions Given",
              notesYes: latestA.notesYes ? latestA.notesYes : "No Notes Given",
              greatestImpact: latestA.greatestImpact ? latestA.greatestImpact : "No Greatest Impact Given",
              riskResponse: latestA.riskResponse ? latestA.riskResponse : "No Risk Response Given",
              mmpSummary: latestA.mmpSummary ? latestA.mmpSummary : "No MMP Summary Given",
              risk: latestA.likelihood && latestA.consequence ? this.calculateRiskScore(latestA) : "No Risk Given",
              likelihood: latestA.likelihood,
              consequence: latestA.consequence,
              who: latestA.who ? latestA.who : "No Owner Given",
              when: latestA.when ? this.formatDate(latestA.when) : "No Due Date Given",
              what: latestA.what ? latestA.what : "No Action Plan Given",
              reason: latestA.reason ? latestA.reason : "No Reason Given",
              assumptionsNo: latestA.assumptionsNo ? latestA.assumptionsNo : "No Assumptions Given",
              notesNo: latestA.notesNo ? latestA.notesNo : "No Notes Given",
              documentation: latestA.documentation ? latestA.documentation : "No Documentation Given",
              assumptionsNA: latestA.assumptionsNA ? latestA.assumptionsNA : "No Assumptions Given",
              notesNA: latestA.notesNA ? latestA.notesNA : "No Notes Given"
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
        if (question.level == this.filterList.filterMRL) {
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
    XLSX.utils.book_append_sheet(wb, ws, "Comprehensive Report Page");

    /* save to file */
    XLSX.writeFile(wb, "comprehensive.xlsx");
  }

  public calculateRiskScore(latestAnswer) {
    // preventing off by one errors, with nulls.
    // values should always be 1-5
    var riskMatrix = [
      [null],
      [null, 1, 3, 5, 8, 12],
      [null, 2, 7, 11, 14, 17],
      [null, 4, 10, 15, 19, 21],
      [null, 6, 12, 18, 22, 24],
      [null, 9, 16, 20, 23, 25],
    ];

    // typescript -_-
    var likelihood = (<any>latestAnswer).likelihood;
    var consequence = (<any>latestAnswer).consequence;

    if (likelihood && consequence) {
      // value is the same as the index, b/c we put nulls in the matrix
      var likelihoodIndex = Number(likelihood);
      var consequenceIndex = Number(consequence);

      // var name = selectedBox.className.replace(/ selected/g, '')
      // selectedBox.className = `${name} selected`;

      return riskMatrix[likelihoodIndex][consequenceIndex];
    } else {
      return " ";
    }
  }

  public pickRiskColor(latestAnswer) {
    var riskScore = this.calculateRiskScore(latestAnswer);
    if (riskScore >= 1 && riskScore <= 11) {
      return "green";
    } else if (riskScore >= 12 && riskScore <= 19) {
      return "#e2d706";
    } else if (riskScore >= 20 && riskScore <= 25) {
      return "red";
    }
  }

  formatDate(date) {
    if (date) {
      return new Date(date).toISOString().substr(0, 10);
    } else {
      return "";
    }
  }


}
