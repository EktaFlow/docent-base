import { NgModule, Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ViewsComponent } from "../../components/views/views.component";
import { AssessmentService } from "../../services/assessment.service";
import { GoogleAnalytics } from "../../services/helpers/GoogleAnalytics";
import { LegendPopoverComponent } from "../../components/legend-popover/legend-popover.component";
import { Router, ActivatedRoute } from "@angular/router";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
// import html2canvas from 'html2canvas';

var assessmentQuery = gql`
  query assessment($_id: String) {
    assessment(_id: $_id) {
      name
      targetMRL
      questions {
        questionId
        mrLevel
        threadName
        questionText
        subThreadName
        currentAnswer
        answers {
          answer
        }
      }
    }
  }
`;

@NgModule()
@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  allQuestions: any;
  assessmentId: any;
  questionSet: any;
  showAll: any = true;
  pageName: any = "MRL Summary";
  targetMRL: any;
  assessmentIdFromParams: any;
  private imageDownloading: boolean = false;
  private assessmentName: string;

  constructor(
    private apollo: Apollo,
    public popOver: PopoverController,
    private assessmentService: AssessmentService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assessmentIdFromParams = activatedRoute.snapshot.paramMap.get(
      "assessmentId"
    );
  }

  // helper function to pull unique values from array.
  unique = (item, index, array) => array.indexOf(item) == index;

  ionViewWillEnter() {
    GoogleAnalytics.trackPage("dashboard");
  }

  async ngOnInit() {
    this.assessmentId = await this.assessmentService.getCurrentAssessmentId();

    this.apollo
      .watchQuery({
        query: assessmentQuery,
        variables: { _id: this.assessmentId },
        fetchPolicy: "network-only",
      })
      .valueChanges.subscribe((data) => {
        this.allQuestions = (<any>data.data).assessment.questions;
        this.questionSet = this.createQuestionSet(this.allQuestions);
        this.targetMRL = (<any>data.data).assessment.targetMRL;
        this.assessmentName = (<any>data.data).assessment.name;
        this.questionSet = this.questionSet.filter((s) => s.header.length > 1);
        if (window.innerWidth > 1024) {
          this.questionSet.unshift({
            questions: [
              {
                subheader: "MR Levels",
                answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              },
            ],
          });
        }
      });
  }

  downloadPNG() {
    // var image = document.getElementById('desktoper');
    // this.imageDownloading = true;
    //
    // html2canvas(image).then(canvas => {
    //     canvas.toBlob(blob => {
    //         saveAs(blob, `mra-${this.assessmentName}-summary.png`);
    //         this.imageDownloading = false;
    //     });
    // })
    // .catch(e => console.error(e));
  }

  isHeader(response) {
    return typeof response == "number";
  }

  dearGod() {
    return this.questionSet.map((a) => {
      a.questions.map((b) => {
        b.answers.map((c) => {
          if (c == true) {
            var index = b.answers.indexOf(c);
            for (let i = 0; i < index; i += 1) {
              b.answers[i] = true;
            }
          }
        });
        return b;
      });
      return a;
    });
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

  createQuestionSet(questionsArray) {
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
        var mrLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var a = mrLevels.map((f) => {
          // default is null/gray
          var sectionValue = null;
          var questionSet = questions.filter((s) => s.mrLevel == f);
          // if there are no questions, the section is marked as blank
          if (questionSet.length == 0) {
            sectionValue = "blank";
          }

          if (
            questionSet.length > 0 &&
            questionSet.every(
              (obj) =>
                obj.answers.length > 0 &&
                obj.answers[obj.answers.length - 1].answer == "Yes"
            )
          ) {
            sectionValue = true;
          }
          // if every answer is yes, complete the section
          if (
            questionSet.length > 0 &&
            questionSet.every((a) => {
              a.answers.length > 0 &&
                a.answers[a.answers.length - 1].answer == "Yes";
            })
          ) {
            sectionValue = true;
          }
          questionSet.forEach((a) => {
            // if any answer is no, fail the section.
            if (
              a.answers.length > 0 &&
              a.answers[a.answers.length - 1].answer == "No"
            )
              sectionValue = false;
          });
          return sectionValue;
        });
        return { subheader: sName, answers: a };
      });

      return { header: a, questions: subThreadNames };
    });
    return subThreadNames;
  }

  goToQuestion(subheader) {
    var questions = this.allQuestions.filter(
      (q) => q.subThreadName == subheader && q.mrLevel == this.targetMRL
    );
    if (questions.length != 0) {
      this.router.navigate([
        "/questions",
        {
          assessmentId: this.assessmentId,
          questionId: questions[0].questionId,
        },
      ]);
    } else {
      alert(
        "There are no questions in this subthread on your current Target MRL"
      );
    }
  }

  presentViewsPop(event) {
    this.popOver
      .create({
        component: ViewsComponent,
        event: event,
      })
      .then((popover) => popover.present());
  }

  presentLegend(event) {
    this.popOver
      .create({
        component: LegendPopoverComponent,
        cssClass: "legendpop",
        event: event,
      })
      .then((popover) => popover.present());
  }

  toggleSubThread(thread) {
    thread.show = !thread.show;
  }

  expandAll() {
    this.showAll = !this.showAll;
  }

  handleActionItems = () =>
    this.router.navigate([
      "/action-items",
      { assessmentId: this.assessmentId },
    ]);
}
