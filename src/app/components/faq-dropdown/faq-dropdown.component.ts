import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'faq-dropdown',
  templateUrl: './faq-dropdown.component.html',
  styleUrls: ['./faq-dropdown.component.scss'],
})
export class FaqDropdownComponent implements OnInit {
  //vars
  @Input() faq;
  faqOpen: boolean = false;

  constructor() { }

  ngOnInit(){}

  toggleFaq(){
    this.faqOpen ? this.faqOpen = false : this.faqOpen = true;
  }

}
