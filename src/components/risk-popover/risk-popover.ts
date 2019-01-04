import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  	selector: 'risk-popover',
  	templateUrl: 'risk-popover.html'
})
export class RiskPopoverComponent {
	public chartView: any;
	public chart: any;
	constructor( public navParams: NavParams) {
                console.log(this.navParams.get('highlight'));
		this.chartView = this.navParams.get('highlight');
	}
	toggleDescriptionTable(){
    this.chartView = (<any>event).path[0].innerText.toLowerCase();
		setTimeout(() => {
		  this.chart = document.getElementsByClassName("criteria-table")[0];
		  this.scrollTableToView();
		}, 200);
	}
	scrollTableToView(){
		if (this.chartView !== ''){
			this.chart.scrollIntoView();
		} else {
			window.scrollTo(0, 0);
		}
	}
}
