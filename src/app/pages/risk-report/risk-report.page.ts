import { Component, OnInit } from "@angular/core";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { ActivatedRoute, Router } from "@angular/router";
import * as XLSX from "xlsx";
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
`;
@Component({
  selector: "risk-report",
  templateUrl: "./risk-report.page.html",
  styleUrls: ["./risk-report.page.scss"],
})
export class RiskReportPage implements OnInit {
  assessmentId: any;
  pageName: any = "Detailed Risk Report";
  schema: any;
  questions: any;
  targetMRL: any;
  nonLevelSchema: any;
  extraQuestions: any;
  noExtraQuestions: boolean = true;
  filterList: any = {};
  unfilteredQuestions: any;
  autoFilter = true;
  filteredSchema: any;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assessmentId = this.activatedRoute.snapshot.paramMap.get(
      "assessmentId"
    );
  }

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("RiskReport");
  }

  async ngOnInit() {
    this.apollo
      .watchQuery({
        query: assessmentQuery,
        variables: { _id: this.assessmentId },
        fetchPolicy: "network-only",
      })
      .valueChanges.subscribe((data) => {
        var assessment = (<any>data.data).assessment;
        this.unfilteredQuestions = assessment.questions;
        this.targetMRL = assessment.targetMRL;
        var extraQuestions = assessment.questions.filter(
          (q) => q.answers.length > 0
        );
        for (let question of extraQuestions) {
          question = question.answers.filter((a) => a.answer == null);
        }
        extraQuestions = extraQuestions.filter(
          (q) => q.mrLevel != assessment.targetMRL
        );
        this.extraQuestions = extraQuestions;

        this.schema = this.createSchemaObject(this.unfilteredQuestions);
        this.filteredSchema = this.createSchemaObject(this.unfilteredQuestions);
        this.filteredSchema = this.filteredSchema.filter(
          (s) => s.header.length > 1
        );

        if (this.autoFilter) {
          this.filterList.filterMRL = this.targetMRL;
          this.filterTheList();
          this.filterList.filterTitle = this.targetMRL;
        }
      });
  }

  createSchemaObject(questionsArray) {
    console.log(111, questionsArray)
    
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
        console.log(222, questions)
        var mrLevels = this.filterByProperty(questions, "mrLevel");
        var a = mrLevels.map((f) => {
          var questionSet = questions
            .filter((s) => s.mrLevel == f)
            .map((a) => ({
              text: a.questionText,
              questionId: a.questionId,
              mrl: a.mrLevel,
              latestAnswer: a.answers[a.answers.length - 1], //attempt to grab the most recent answer
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
    if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
      var filteredQuestions = this.unfilteredQuestions.filter(
        (question) => this.filterList.filterMRL === 'All Levels' ? question.currentAnswer == this.filterList.filterAnswer :
        
        question.mrLevel == this.filterList.filterMRL && question.currentAnswer == this.filterList.filterAnswer
      );
      this.filteredSchema = this.createSchemaObject(filteredQuestions);
      this.filterList.filterTitle = this.filterList.filterMRL;
    } else {
      this.filteredSchema = this.createSchemaObject(this.unfilteredQuestions);
      this.filterList.filterTitle = "";
    }
  }

  clearFilter() {
    this.filterList.filterMRL = 0;
    this.filterTheList();
    this.filterList.filterTitle = "";
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

  unique = (item, index, array) => array.indexOf(item) == index;

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

  public saveXLS() {
    // var headers = this.columns.map(c => c.title);
    var headers = [
      "MRL",
      "Thread Name",
      "SubThread Name",
      "Question Text",
      "Comments/Rationale",
      "Risk Score",
      "Greatest Impact",
      "Risk Response",
      "MMP Summary",
    ];

    var values = this.unfilteredQuestions.map((q) => {
      return this.returnValues(q);
    });

    var nonLevelValues = this.extraQuestions.map((q) => {
      return this.returnValues(q);
    });

    var finalValues = [...values, ...nonLevelValues];

    var worksheet = [headers, ...finalValues];

    var ws = XLSX.utils.aoa_to_sheet(worksheet);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      "Detailed Risk Report for MRL " + String(this.targetMRL)
    );

    /* save to file */
    XLSX.writeFile(wb, "detailed_risk_report.xlsx");
  }

  returnValues(q) {
    if (q.answers.length > 0) {
      var latestAnswer = q.answers[q.answers.length - 1];
      var currentComments;
      if (latestAnswer.notesYes != undefined) {
        currentComments = latestAnswer.notesYes;
      }
      if (latestAnswer.notesNo != undefined) {
        currentComments = latestAnswer.notesNo;
      }
      if (latestAnswer.notesNA != undefined) {
        currentComments = latestAnswer.notesNA;
      }
      var riskScore = this.calculateRiskScore(latestAnswer);
      return [
        q.mrLevel,
        q.threadName,
        q.subThreadName,
        q.questionText,
        currentComments,
        riskScore,
        latestAnswer.greatestImpact,
        latestAnswer.riskResponse,
        latestAnswer.mmpSummary,
      ];
    } else {
      return [q.threadName, q.subThreadName, q.questionText];
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
}
