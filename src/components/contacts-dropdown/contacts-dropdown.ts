import { Component, Input } from '@angular/core';

@Component({
  selector: 'contacts-dropdown',
  templateUrl: 'contacts-dropdown.html'
})
export class ContactsDropdownComponent {

    @Input() contacts;

    feedbackOpen: boolean = false;
    
    constructor() {
    }

    toggleFeedback() {
    	this.feedbackOpen ? this.feedbackOpen = false : this.feedbackOpen = true;    
    }

}
