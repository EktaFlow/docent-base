import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from '../../components/topbar/topbar';
import { AssessmentService } from '../../services/assessment.service';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';

import * as XLSX from 'xlsx';

import { QuestionsPage } from '../questions/questions';

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




@IonicPage()
@Component({
  selector: 'page-actionitems',
  templateUrl: 'actionitems.html',
})


export class ActionitemsPage {
        public data:any;

	async ngOnInit() {
		this.assessmentId = await this.assessmentService.getCurrentAssessmentId();

		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
                                        console.log(data);
					this.no = (<any>data.data).assessment.questions.filter( a => {
                                                if (a.answers.length > 0 ) {
                                                        return a.answers[a.answers.length - 1].answer == "No"
                                                }

                                        });
					this.attachments = (<any>data.data).assessment.files;

                                        var newData:Array<any> = [];

                                        this.no.forEach( (element) => {
                                            var newObj:any = {};
                                            newObj.threadName = "" + element.threadName;
                                            newObj.subThreadName = "" + element.subThreadName;
                                            newObj.questionText = "" + element.questionText;
                                            // newObj.currentAnswer = "" + element.answers[element.answers.length - 1].answer;
                                            newObj.what = "" + element.answers[element.answers.length - 1].what;
                                            newObj.when = "" + this.formatDate(element.answers[element.answers.length - 1].when);
                                            newObj.who = "" + element.answers[element.answers.length - 1].who;

                                            var cur = element.answers[element.answers.length - 1];
console.log(element);
                                            newObj.risk = "" + this.calculateRiskScore(cur.likelihood, cur.consequence);
                                            newData.push(newObj);
                                        });

                                        this.data = newData;
                                        console.log(this.data);
                                        this.length = this.data.length;
                                        this.onChangeTable(this.config);
			});
	}

  formatDate(date){
    if (!date) {
  		return null;
  	} else {
  		return new Date(date)
  			     .toISOString()
  			     .slice(0,10);
  	}
  }


  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Thread', name: 'threadName', filtering: {filterString: '', placeholder: 'Filter by thread'}},
    {title: 'Subthread', name: 'subThreadName', filtering: {filterString: '', placeholder: 'Filter by subthread'}},
    {title: 'Question', name: 'questionText', filtering: {filterString: '', placeholder: 'Filter by question'}},
    // {title: 'Answer', name: 'currentAnswer', filtering: {filterString: '', placeholder: 'Filter by answer'}},
    {title: 'Action', name: 'what', filtering: {filterString: '', placeholder: 'Filter by action'}},
    {title: 'Due', name: 'when', filtering: {filterString: '', placeholder: 'Filter by due date'}, sort: 'asc'},
    {title: 'Owner', name: 'who', filtering: {filterString: '', placeholder: 'Filter by owner'}},
    {title: 'Risk Level', name: 'risk', filtering: {filterString: '', placeholder: 'Filter by risk'}}
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



  public saveXLS() {
        var headers = this.columns.map(c => c.title);
        var values = this.no.map(nq => {
                return [
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





	no: any;
	assessmentId: any;
	private attachments: any;
	pageName: any = "Action Items";

	constructor( private apollo: Apollo,
							 public navCtrl: NavController,
							 public navParams: NavParams,
							 public popOver: PopoverController,
               private assessmentService: AssessmentService) {
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
		this.navCtrl.push(QuestionsPage, {
			questionId: questionId
		});
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
