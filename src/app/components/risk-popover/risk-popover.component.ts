import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'risk-popover',
  templateUrl: './risk-popover.component.html',
  styleUrls: ['./risk-popover.component.scss'],
})
export class RiskPopoverComponent implements OnInit {
  //vars
  public chartView: any;
	public chart: any;

  constructor(
    public navParams: NavParams,
    public popOver: PopoverController,
		private activatedRoute: ActivatedRoute
  ) {
    console.log(this.navParams.get('highlight'));
    // this.chartView = this.navParams.get('highlight');
		this.chartView = this.activatedRoute.snapshot.paramMap.get('highlight');

  }

	ngOnInit(){

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
		this.popOver.dismiss();
	}

}
