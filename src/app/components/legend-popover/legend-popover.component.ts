import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legend-popover',
  templateUrl: './legend-popover.component.html',
  styleUrls: ['./legend-popover.component.scss'],
})
export class LegendPopoverComponent implements OnInit {
  text: string;

  constructor() {
    console.log('Hello LegendPopoverComponent Component');
    this.text = 'Hello World';
   }

  ngOnInit() {}

}
