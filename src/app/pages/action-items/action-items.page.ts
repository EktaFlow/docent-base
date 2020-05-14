import { NgModule, Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AssessmentService } from '../../services/assessment.service';
import { GoogleAnalytics } from '../../services/helpers/GoogleAnalytics';
import { ReportInfoCardComponent } from "../../components/report-info-card/report-info-card.component";
import { QuestionsPage } from '../../pages/questions/questions.page';

// import { Ng2TableModule } from 'ng2-table/ng2-table';
// import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import {Router, ActivatedRoute} from "@angular/router"
import * as XLSX from 'xlsx';


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
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
})
export class ActionItemsPage implements OnInit {

	public data:any;
	public rows:Array<any> = [];
	public columns:Array<any> = [
		{title: 'Thread', name: 'threadName', filtering: {filterString: '', placeholder: 'Filter by thread'}},
		{title: 'Subthread', name: 'subThreadName', filtering: {filterString: '', placeholder: 'Filter by subthread'}},
		{title: 'Question', name: 'questionText', filtering: {filterString: '', placeholder: 'Filter by question'}},
		// {title: 'Answer', name: 'currentAnswer', filtering: {filterString: '', placeholder: 'Filter by answer'}},
		{title: 'Action', name: 'what', filtering: {filterString: '', placeholder: 'Filter by action'}},
		{title: 'Due', name: 'when', filtering: {filterString: '', placeholder: 'Filter by due date'}, sort: 'asc'},
		{title: 'Owner', name: 'who', filtering: {filterString: '', placeholder: 'Filter by owner'}},
		{title: 'Risk Level', name: 'risk', filtering: {filterString: '', placeholder: 'Filter by risk level'}}
	];
	public page:number = 1;
	public itemsPerPage:number = 10;
	public maxSize:number = 5;
	public numPages:number = 1;
	public length:number = 0;
	public config:any = {
		paging: true,
		sorting: {columns: this.columns},
		filtering: {filterString: ''},
		className: ['table-striped', 'table-bordered']
	};
	no: any;
	assessmentId: any;
	private attachments: any;
	pageName: any = "Action Items";
	assessmentIdFromParams: any;
	autoFilter: boolean = true;
	unfilteredQuestions: any;
	filterList: any = {};
	filterMRL: any;


		constructor( private apollo: Apollo,
								 public popOver: PopoverController,
								 private assessmentService: AssessmentService,
								 public router: Router,
								 private activatedRoute: ActivatedRoute) {
										this.assessmentIdFromParams = this.activatedRoute.snapshot.paramMap.get('assessmentId');
										console.log(this.assessmentIdFromParams);
										this.autoFilter = this.activatedRoute.snapshot.paramMap.get('autoFilter');
	                }


		async ngOnInit() {
			this.assessmentId = await this.assessmentService.getCurrentAssessmentId();

			this.apollo.watchQuery({
				query: assessmentQuery,
				variables: {_id: this.assessmentId},
				fetchPolicy: "network-only"
				}).valueChanges
				.subscribe(data => {
						this.no = (<any>data.data).assessment.questions.filter( a => {
	                if (a.answers.length > 0 ) {
	                        return a.answers[a.answers.length - 1].answer == "No"
	                }
						});
						var targetMRL = (<any>data.data).assessment.targetMRL;
						this.attachments = (<any>data.data).assessment.files;
	          var newData:Array<any> = [];
						console.log(this.no);
	          this.no.forEach( (element) => {
	              var newObj:any = {};
	              newObj.threadName = "" + element.threadName;
	              newObj.subThreadName = "" + element.subThreadName;
	              newObj.questionText = "" + element.questionText;
	              // newObj.currentAnswer = "" + element.answers[element.answers.length - 1].answer;
	              newObj.what = "" + element.answers[element.answers.length - 1].what;
	              newObj.when = this.formatDate( element.answers[element.answers.length - 1].when);
	              newObj.who = "" + element.answers[element.answers.length - 1].who;
								newObj.level = "" + element.mrLevel;
	              var cur = element.answers[element.answers.length - 1];
	              newObj.risk = "" + this.calculateRiskScore(cur.likelihood, cur.consequence);
	              newData.push(newObj);
	          });
						this.data = newData;
						this.unfilteredQuestions = newData;

						if (this.autoFilter){
							console.log('here');
							this.filterList.filterMRL = targetMRL;
							console.log(targetMRL)
							this.data = this.unfilteredQuestions.filter(question => {
								if (question.level == targetMRL){
									return question;
								}
							});

					 } else {
						 this.data = this.unfilteredQuestions;
					 }


	          // console.log(this.data);
	          // this.length = this.data.length;
	          // this.onChangeTable(this.config);
				});
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
					if (question.level == this.filterList.filterMRL) {
						// console.log('here')
						return question
					}
				});
				console.log(filteredQuestions);
				this.data = filteredQuestions;
			} else {
				this.data = this.unfilteredQuestions;
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

	  public changePage(page:any, data:Array<any> = this.data):Array<any> {
	    let start = (page.page - 1) * page.itemsPerPage;
	    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
	    return data.slice(start, end);
	  }

	  public changeSort(data:any, config:any):any {
	    if (!config.sorting) {
	      return data;
	    }

	    let columns = this.config.sorting.columns || [];
	    let columnName:string = void 0;
	    let sort:string = void 0;

	    for (let i = 0; i < columns.length; i++) {
	      if (columns[i].sort !== '' && columns[i].sort !== false) {
	        columnName = columns[i].name;
	        sort = columns[i].sort;
	      }
	    }

	    if (!columnName) {
	      return data;
	    }

	    // simple sorting
	    return data.sort((previous:any, current:any) => {
	      if (previous[columnName] > current[columnName]) {
	        return sort === 'desc' ? -1 : 1;
	      } else if (previous[columnName] < current[columnName]) {
	        return sort === 'asc' ? -1 : 1;
	      }
	      return 0;
	    });
	  }

	  public changeFilter(data:any, config:any):any {
	    let filteredData:Array<any> = data;
	    this.columns.forEach((column:any) => {
	      if (column.filtering) {
	        filteredData = filteredData.filter((item:any) => {
	          return item[column.name].match(column.filtering.filterString);
	        });
	      }
	    });

	    if (!config.filtering) {
	      return filteredData;
	    }

	    if (config.filtering.columnName) {
	      return filteredData.filter((item:any) =>
	        item[config.filtering.columnName].match(this.config.filtering.filterString));
	    }

	    let tempArray:Array<any> = [];
	    filteredData.forEach((item:any) => {
	      let flag = false;
	      this.columns.forEach((column:any) => {
	        if (item[column.name].toString().match(this.config.filtering.filterString)) {
	          flag = true;
	        }
	      });
	      if (flag) {
	        tempArray.push(item);
	      }
	    });
	    filteredData = tempArray;

	    return filteredData;
	  }

	  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
	    if (config.filtering) {
	      Object.assign(this.config.filtering, config.filtering);
	    }

	    if (config.sorting) {
	      Object.assign(this.config.sorting, config.sorting);
	    }

	    let filteredData = this.changeFilter(this.data, this.config);
	    let sortedData = this.changeSort(filteredData, this.config);
	    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
	    this.length = sortedData.length;
	  }

	  public onCellClick(data: any): any {
	    console.log(data);
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
