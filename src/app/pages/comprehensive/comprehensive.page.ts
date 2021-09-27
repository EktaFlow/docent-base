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
      threads
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
  assessment: any;
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
        this.assessment = (<any>data.data).assessment;
        var questions = this.assessment.questions;
        this.allQuestions = this.assessment.questions;
        var answeredQuestions = [];
        // var questionPosition = this.findAmtOfQs();
        questions.forEach((q) => {
          if (q.answers.length > 0 && q.answers[q.answers.length - 1].answer) {
            var latestA = q.answers[q.answers.length - 1];
            var drilledQuestion = {
              questionId: q.questionId,
              questionPosition: this.findAmtOfQs(q.questionId),
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
          this.filterList.filterMRL = this.assessment.targetMRL;
          this.allQuestions = answeredQuestions.filter((question) => {
            if (question.level == this.assessment.targetMRL) {
              return question;
            }
          });
        } else {
          this.allQuestions = answeredQuestions;
        }
        // all questions is an array of answered questions.
        // preserving the names to leave markup the same.
        this.unfilteredQuestions = answeredQuestions;
        this.targetMRL = this.assessment.targetMRL;
        this.targetDate = this.assessment.targetDate;
        this.location = this.assessment.location;
        this.files = this.assessment.files;
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

  public findAmtOfQs(id) {
    var surveyQs = this.setSurveyQuestions();
    var currentQSetAmt = surveyQs.length;
    console.log(surveyQs)
    console.log(id)
    var currentQPos = surveyQs.indexOf(id) + 1;
    if (currentQPos == 0){
      currentQPos = 'Outside of MRL Level for Assessment';
    }
    return currentQPos;
  }

  setSurveyQuestions() {
    var threadNames = this.assessment.questions;
    threadNames = threadNames.map((tn) => tn.threadName);
    var distinctThreadNames = threadNames.filter(
      (a, i) => threadNames[i + 1] != a && a.length > 0
    );
    var selectedThreads = this.assessment.threads.map(
      (threadNumber) => distinctThreadNames[threadNumber - 1]
    );

    var level1 = this.allQuestions.filter(
      (q) => q.mrLevel == this.assessment.targetMRL
    );
    var level2 = level1.filter((q) => selectedThreads.includes(q.threadName));
    var level3 = level2.map((q) => q.questionId);

    return level3;
  }

  saveXLS() {
    var headers = [
      "Thread Name",
      "Subthread Name",
      "MRL",
      "Question Number",
      "Question Text",
      "Current Answer",
      "Yes Fields",
      "Objective Evidence",
      "Yes Assumptions",
      "Yes Notes",
      "No Fields",
      "Owner",
      "Due Date",
      "Action Plan",
      "Reason",
      "Assumptions No",
      "Notes No",
      "NA Fields",
      "Documentation",
      "NA Assumptions",
      "NA Notes",
      "Risk Fields",
      "Risk Score",
      "Likelihood",
      "Consequence",
      "Greatest Impact",
      "Risk Response",
      "MMP Summary"
    ];

    var values = this.unfilteredQuestions.map((q) => {
      return [
        q.threadName,
        q.subThreadName,
        q.level,
        q.questionPosition,
        q.questionText,
        q.currentAnswer,
        '',
        q.objectiveEvidence,
        q.assumptionsYes,
        q.notesYes,
        '',
        q.who,
        q.when,
        q.what,
        q.reason,
        q.assumptionsNo,
        q.notesNo,
        '',
        q.documentation,
        q.assumptionsNA,
        q.notesNA,
        '',
        q.risk,
        q.likelihood,
        q.consequence,
        q.greatestImpact,
        q.riskResponse,
        q.mmpSummary

      ];
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
