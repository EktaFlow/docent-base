import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  	selector: 'risk-popover',
  	templateUrl: 'risk-popover.html'
})
export class RiskPopoverComponent {
	public chartView: any;
	public chart: any;
	constructor( public navParams: NavParams, public viewCtrl: ViewController) {
                console.log(this.navParams.get('highlight'));
		this.chartView = this.navParams.get('highlight');
	}
	toggleDescriptionTable(type){
    this.chartView = type
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

	closePopover(){
		this.viewCtrl.dismiss();
	}

}
