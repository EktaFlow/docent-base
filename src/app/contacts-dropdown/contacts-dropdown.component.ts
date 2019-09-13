import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contacts-dropdown',
  templateUrl: './contacts-dropdown.component.html',
  styleUrls: ['./contacts-dropdown.component.scss'],
})
export class ContactsDropdownComponent implements OnInit {
  @Input() contacts;
  feedbackOpen: boolean = false;

  constructor() { }

  toggleFeedback() {
    this.feedbackOpen ? this.feedbackOpen = false : this.feedbackOpen = true;
  }

  ngOnInit() {}

}
