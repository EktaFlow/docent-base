import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'acronym-popover',
  templateUrl: './acronym-popover.component.html',
  styleUrls: ['./acronym-popover.component.scss'],
})
export class AcronymPopoverComponent implements OnInit {

  text: string;
  constructor(
    public navParams: NavParams,
  ) {
    this.text = navParams.data.fullText;
  }

  ngOnInit(){}



}
