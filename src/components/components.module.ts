import { NgModule } from '@angular/core';
import { ViewsComponent } from './views/views';
import { AssessmentslistComponent } from './assessmentslist/assessmentslist';
import { ThreadsListComponent } from './threads-list/threads-list';
import { HelpmenuComponent } from './helpmenu/helpmenu';
import { ContactsDropdownComponent } from './contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from './faq-dropdown/faq-dropdown';
import { FileUploadPopoverComponent } from './file-upload-popover/file-upload-popover';
import { TopbarComponent } from './topbar/topbar';
import { ImportComponent } from './import/import';
import { SubthreadPopupComponent } from './subthread-popup/subthread-popup';
import { ThreadPopupComponent } from './thread-popup/thread-popup';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { AddTeamMembersPopOverComponent } from './add-team-members-pop-over/add-team-members-pop-over';
import { JsonUploadPopoverComponent } from './json-upload-popover/json-upload-popover';
import { AssessmentScopePopoverComponent } from './assessment-scope-popover/assessment-scope-popover';
import { MobileNavPopoverComponent } from './mobile-nav-popover/mobile-nav-popover';
import { LegendPopoverComponent } from './legend-popover/legend-popover';
import { AcronymPopoverComponent } from './acronym-popover/acronym-popover';
import { QuestionHistoryPopoverComponent } from './question-history-popover/question-history-popover';

@NgModule({
	declarations: [
	ViewsComponent,
    AssessmentslistComponent,
    ThreadsListComponent,
		HelpmenuComponent,
		ContactsDropdownComponent,
		FaqDropdownComponent,
    FileUploadPopoverComponent,
    TopbarComponent,
    ImportComponent,
    SubthreadPopupComponent,
    ThreadPopupComponent,
    LoginComponent,
    RegisterComponent,
    AddTeamMembersPopOverComponent,
    JsonUploadPopoverComponent,
    AssessmentScopePopoverComponent,
    MobileNavPopoverComponent,
    LegendPopoverComponent,
    AcronymPopoverComponent,
    QuestionHistoryPopoverComponent
    ],
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [
	ViewsComponent,
    AssessmentslistComponent,
    ThreadsListComponent,
		HelpmenuComponent,
		ContactsDropdownComponent,
		FaqDropdownComponent,
    FileUploadPopoverComponent,
    TopbarComponent,
    ImportComponent,
    SubthreadPopupComponent,
    ThreadPopupComponent,
    LoginComponent,
    RegisterComponent,
    AddTeamMembersPopOverComponent,
		JsonUploadPopoverComponent,
    AssessmentScopePopoverComponent,
    MobileNavPopoverComponent,
    LegendPopoverComponent,
    AcronymPopoverComponent,
    QuestionHistoryPopoverComponent
	],
	entryComponents: [
        ViewsComponent,
        AssessmentslistComponent,
        ThreadsListComponent,
    	HelpmenuComponent,
    	ContactsDropdownComponent,
    	FaqDropdownComponent,
        FileUploadPopoverComponent,
        TopbarComponent,
        ImportComponent,
        SubthreadPopupComponent,
        ThreadPopupComponent,
        LoginComponent,
        RegisterComponent,
        AddTeamMembersPopOverComponent,
        JsonUploadPopoverComponent,
				AssessmentScopePopoverComponent,
				MobileNavPopoverComponent,
				LegendPopoverComponent,
				AcronymPopoverComponent,
				QuestionHistoryPopoverComponent
    ]
})

export class ComponentsModule {}
