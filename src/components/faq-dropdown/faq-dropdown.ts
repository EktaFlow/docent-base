import { Component, Input } from '@angular/core';

@Component({
    selector: 'faq-dropdown',
    templateUrl: 'faq-dropdown.html'
})

export class FaqDropdownComponent {

    @Input() faq;
    faqOpen: boolean = false;

    constructor() {}

    toggleFaq() {
        this.faqOpen ? this.faqOpen = false : this.faqOpen = true;
    }

}
