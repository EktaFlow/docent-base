import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from '../../components/topbar/topbar';
import { AssessmentService } from '../../services/assessment.service';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { TableData } from './table-data';


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
		# mpf - for now bringing in all No vars.
		when
		who
		risk
		what
		reason
		assumptionsNo
    notesNo
    technical
		schedule
    cost
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

	async ngOnInit() {
		this.assessmentId = await this.assessmentService.getCurrentAssessmentId();

		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
					this.no = (<any>data.data).assessment.questions.filter(a => a.currentAnswer == "No");
					this.attachments = (<any>data.data).assessment.files;

                                        var newData:Array<any> = [];
        
                                        this.no.forEach( (element) => { 
                                            var newObj = {};
                                            newObj.threadName = "" + element.threadName;
                                            newObj.subThreadName = "" + element.subThreadName;
                                            newObj.questionText = "" + element.questionText;
                                            newObj.currentAnswer = "" + element.currentAnswer;
                                            newObj.what = "" + element.what;
                                            newObj.when = "" + element.when;
                                            newObj.who = "" + element.who;
                                            newData.push(newObj);
                                        });

                                        this.data = newData;
                                        console.log(this.data);
                                        this.length = this.data.length;
                                        this.onChangeTable(this.config);
			});
	}


  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Thread', name: 'threadName', filtering: {filterString: '', placeholder: 'Filter by thread'}},
    {title: 'Subthread', name: 'subThreadName', filtering: {filterString: '', placeholder: 'Filter by subthread'}},
    {title: 'Question', name: 'questionText', filtering: {filterString: '', placeholder: 'Filter by question'}},
    {title: 'Answer', name: 'currentAnswer', filtering: {filterString: '', placeholder: 'Filter by answer'}},
    {title: 'Action', name: 'what', filtering: {filterString: '', placeholder: 'Filter by action'}},
    {title: 'Due', name: 'when', filtering: {filterString: '', placeholder: 'Filter by due date'}, sort: 'asc'},
    {title: 'Owner', name: 'who', filtering: {filterString: '', placeholder: 'Filter by owner'}}
/*
    {title: 'Risk', name: 'risk', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Reason', name: 'reason', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Assumptions', name: 'assumptionsNo', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Notes', name: 'notesNo', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Technical', name: 'technical', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Schedule', name: 'schedule', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Cost', name: 'cost', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Files', name: 'files', filtering: {filterString: '', placeholder: 'Filter by name'}}
*/
  ];

/*
  public columns:Array<any> = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {
      title: 'Position',
      name: 'position',
      sort: false,
      filtering: {filterString: '', placeholder: 'Filter by position'}
    },
    {title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
    {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
    {title: 'Start date', className: 'text-warning', name: 'startDate'},
    {title: 'Salary ($)', name: 'salary'}
  ];
*/



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

}
