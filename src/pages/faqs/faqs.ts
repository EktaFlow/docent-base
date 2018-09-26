import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


import { ContactsDropdownComponent } from '../../components/contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from '../../components/faq-dropdown/faq-dropdown';

@IonicPage()
@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
export class FaqsPage {
        mainTitle: String;
        assessmentId: any;

    constructor( public navCtrl:   NavController,
	               public navParams: NavParams,
	               public http:      HttpClient )
    {

            this.mainTitle = "Frequently Asked Questions";
            this.assessmentId = navParams.data.assessmentId;
    }

    private faqInfoStandalone: any;
		private faqInfoWeb:        any;
		private faqInfoIOS:        any;
		private faqInfoAndroid:    any;

		private feedbackContacts: any;


		getFaqInfo() {
        this.http.get('assets/json/faq.json')
            .subscribe( data => {
								console.log(data);
						    this.faqInfoStandalone = this.filterAppType("standalone", data);
            });
		}

    getFeedbackContacts() {
       this.http.get('assets/json/feedback_contacts.json')
           .subscribe( data => this.feedbackContacts = data );
		}

		// Each type of app will have a different set of FAQ questions
    filterAppType(type, arr) {
		    return arr.filter( object => object.help_type == type || !object.help_type );
		}

    ionViewDidLoad() {
				this.getFaqInfo();
        this.getFeedbackContacts();
    }


    ngOnInit() {
        this.mainTitle = "Frequently Asked Questions";
    }

}
