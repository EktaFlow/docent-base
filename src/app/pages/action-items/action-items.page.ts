import { NgModule, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AssessmentService } from '../../services/assessment.service';
import { GoogleAnalytics } from '../../services/helpers/GoogleAnalytics';
import { ReportInfoCardComponent } from "../../components/report-info-card/report-info-card.component";
import { QuestionsPage } from '../../pages/questions/questions.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { DatatableComponent } from '@swimlane/ngx-datatable/src/lib/components/datatable.component';
// import { ColumnMode } from '@swimlane/ngx-datatable/src/public-api';

// import { Ng2TableModule } from 'ng2-table/ng2-table';
// import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import {Router, ActivatedRoute} from "@angular/router"
import {isElectron} from "../../services/constants"
import * as XLSX from 'xlsx';


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	targetMRL
	questions {
		mrLevel
		questionText
		threadName
		subThreadName
		currentAnswer
		questionId
                answers {
		when
		who
		risk
                consequence
                likelihood
		what
		reason
		assumptionsNo
                notesNo
                answer
                # technical
		# schedule
                # cost
                }
	}
	files {
		name
		questionId
		url
	}
	}
}
`



@NgModule()
@Component({
  selector: 'action-items',
  templateUrl: './action-items.page.html',
  styleUrls: ['./action-items.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ActionItemsPage implements OnInit {

	public data:any;
	public length:number = 0;
	no: any;
	assessmentId: any;
	private attachments: any;
	pageName: any = "Action Items";
	assessmentIdFromParams: any;
	autoFilter: boolean = true;
	unfilteredQuestions: any;
	filterList: any = {};
	filterMRL: any;
	isElectron: any;
	inAssessment: any;

	rows:any = [];

  temp:any = [];

  columns:any = [{name: 'MRL'}, { name: 'Thread' }, { name: 'Subthread' }, {name: 'Question'}, {name: 'Answer'}, {name: 'Action'}, {name: 'Due'}, {name: 'Owner'}, {name: 'Risk'}];

  // @ViewChild(DatatableComponent) table: DatatableComponent;

	// ColumnMode = ColumnMode;


		constructor( private apollo: Apollo,
								 public popOver: PopoverController,
								 private assessmentService: AssessmentService,
								 public router: Router,
								 private activatedRoute: ActivatedRoute) {
										this.assessmentIdFromParams = this.activatedRoute.snapshot.paramMap.get('assessmentId');
										console.log(this.assessmentIdFromParams);
										// this.autoFilter = this.activatedRoute.snapshot.paramMap.get('autoFilter');
	                }


		async ngOnInit() {
			this.isElectron = isElectron;
			if (!isElectron) {
				this.assessmentId = await this.assessmentService.getCurrentAssessmentId();
				// console.log(columns)
				this.apollo.watchQuery({
					query: assessmentQuery,
					variables: {_id: this.assessmentId},
					fetchPolicy: "network-only"
					}).valueChanges
					.subscribe(data => {
						this.setPageVariables((<any>data.data).assessment);
					});
			} else {
				var myStorage = window.localStorage;
				if (myStorage.getItem('inAssessment') == 'true'){
					this.inAssessment = true;
					var fullAssessment = myStorage.getItem('currentAssessment');
					this.setPageVariables(JSON.parse(fullAssessment));
				}
			}

		}

		setPageVariables(assessment){
			this.no = assessment.questions.filter( a => {
						if (a.answers.length > 0 ) {
										return a.answers[a.answers.length - 1].answer == "No"
						}
			});
			var targetMRL = assessment.targetMRL;
			this.attachments = assessment.files;
			var newData:Array<any> = [];
			this.no.forEach( (element) => {
					var newObj:any = {};
					newObj.mrl = "" + element.mrLevel;
					newObj.thread = "" + element.threadName;
					newObj.subthread = "" + element.subThreadName;
					newObj.question = "" + element.questionText;
					// newObj.answer = " ";
					newObj.answer = "" + element.answers[element.answers.length - 1].answer;
					newObj.action = "" + element.answers[element.answers.length - 1].what;
					newObj.due = this.formatDate( element.answers[element.answers.length - 1].when);
					newObj.owner = "" + element.answers[element.answers.length - 1].who;
					var cur = element.answers[element.answers.length - 1];
					newObj.risk = "" + this.calculateRiskScore(cur.likelihood, cur.consequence);
					console.log(newObj.risk)
					newData.push(newObj);
			});
			this.data = newData;
			this.unfilteredQuestions = newData;
			this.rows = newData;

			if (this.autoFilter){
				this.filterList.filterMRL = targetMRL;
				this.rows = this.unfilteredQuestions.filter(question => {
					if (question.mrl == targetMRL){
						return question;
					}
				});

		 } else {
			 this.rows = this.unfilteredQuestions;
		 }
		}

	  /**
	  *   @purpose: format data as a sortable string for table
	  *   @input: date: a new Date() parsable string
	  *   @output: string, format YYYY-MM-DD
	  */
	  formatDate(date){
	    if ( date ) {
	      return new Date(date).toISOString().substr(0,10);
	    } else {
	      return '';
	    }
	  }

		filterTheList(){
			console.log(this.filterList.filterMRL)
			if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
				var filteredQuestions = this.unfilteredQuestions.filter(question => {
					if (question.mrl == this.filterList.filterMRL) {
						// console.log('here')
						return question
					}
				});
				console.log(filteredQuestions);
				this.rows = filteredQuestions;
			} else {
				this.rows = this.unfilteredQuestions;
			}
		}

		clearFilter() {
				this.filterList.filterMRL = 0;
				this.filterTheList();
		}

	  public saveXLS() {
	        var headers = this.columns.map(c => c.title);
	        var values = this.no.map(nq => {
								console.log(nq);
	                return [
										nq.mrLevel,
	                  nq.threadName,
	                  nq.subThreadName,
	                  nq.questionText,
	                  // nq.answers[nq.answers.length - 1].answer,
	                  nq.answers[nq.answers.length - 1].what,
	                  nq.answers[nq.answers.length - 1].when,
	                  nq.answers[nq.answers.length - 1].who,
	                  this.calculateRiskScore(nq.answers[nq.answers.length - 1].likelihood, nq.answers[nq.answers.length - 1].consequence)
	                ];
	        })
	        var worksheet = [headers, ...values];

	        var ws = XLSX.utils.aoa_to_sheet(worksheet);
	        var wb = XLSX.utils.book_new();
	        XLSX.utils.book_append_sheet(wb, ws, 'Action Items');

	        /* save to file */
	        XLSX.writeFile(wb, 'action_items.xlsx');
	  }



		unique = (item, index, array) => array.indexOf(item) == index

		ionViewWillEnter() {
	            GoogleAnalytics.trackPage("actionitems");
	        }


		displayRisks(q) {
					var risks = [];
					q.technical ? risks.push("Technical") : null
					q.schedule  ? risks.push("Schedule")	: null
					q.cost      ? risks.push("Cost")			: null

					return risks.join(", ") || "none";
		}

		getAttachments(q) {
		  return	this.attachments.filter(a => a.questionId == q.questionId );
		}

		navToQuestion(questionId) {
			this.router.navigate(["/questions", {assessmentId: this.assessmentId, questionId: questionId}]);
		}


	  public calculateRiskScore(likelihood, consequence) {
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


	    if ( likelihood && consequence ) {
	      // value is the same as the index, b/c we put nulls in the matrix
	      var likelihoodIndex  = Number(likelihood);
	      var consequenceIndex = Number(consequence);

	      // var name = selectedBox.className.replace(/ selected/g, '')
	      // selectedBox.className = `${name} selected`;

	      return riskMatrix[likelihoodIndex][consequenceIndex];
	    } else {
	      return "";
	    }
	  }

}
