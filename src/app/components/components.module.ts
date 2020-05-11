import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';

import { ViewsComponent } from './views/views.component';
import { ThreadsListComponent } from './threads-list/threads-list.component';
import { HelpmenuComponent } from './helpmenu/helpmenu.component';
import { ContactsDropdownComponent } from './contacts-dropdown/contacts-dropdown.component';
import { FaqDropdownComponent } from './faq-dropdown/faq-dropdown.component';
import { FileUploadPopoverComponent } from './file-upload-popover/file-upload-popover.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ImportComponent } from './import/import.component';
import { SubthreadPopupComponent } from './subthread-popup/subthread-popup.component';
import { ThreadPopupComponent } from './thread-popup/thread-popup.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AddTeamMembersPopOverComponent } from './add-team-members-pop-over/add-team-members-pop-over.component';
import { JsonUploadPopoverComponent } from './json-upload-popover/json-upload-popover.component';
import { AssessmentScopePopoverComponent } from './assessment-scope-popover/assessment-scope-popover.component';
import { MobileNavPopoverComponent } from './mobile-nav-popover/mobile-nav-popover.component';
import { LegendPopoverComponent } from './legend-popover/legend-popover.component';
import { AcronymPopoverComponent } from './acronym-popover/acronym-popover.component';
import { QuestionHistoryPopoverComponent } from './question-history-popover/question-history-popover.component';
import { RiskPopoverComponent } from './risk-popover/risk-popover.component';
import { FileDeleteComponent } from './file-delete/file-delete.component';
import { DoResetComponent } from './do-reset/do-reset.component';
import { ReportInfoCardComponent } from './report-info-card/report-info-card.component';

@NgModule({
  declarations: [
    ViewsComponent,
=======
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
import { PasswordResetComponent } from './password-reset/password-reset';
import { AddTeamMembersPopOverComponent } from './add-team-members-pop-over/add-team-members-pop-over';
import { JsonUploadPopoverComponent } from './json-upload-popover/json-upload-popover';
import { AssessmentScopePopoverComponent } from './assessment-scope-popover/assessment-scope-popover';
import { MobileNavPopoverComponent } from './mobile-nav-popover/mobile-nav-popover';
import { LegendPopoverComponent } from './legend-popover/legend-popover';
import { AcronymPopoverComponent } from './acronym-popover/acronym-popover';
import { QuestionHistoryPopoverComponent } from './question-history-popover/question-history-popover';
import { RiskPopoverComponent } from './risk-popover/risk-popover';
import { FileDeleteComponent } from './file-delete/file-delete';
import { DoResetComponent } from './do-reset/do-reset';
import { ReportInfoCardComponent } from './report-info-card/report-info-card';


@NgModule({
	declarations: [
	ViewsComponent,
    AssessmentslistComponent,
>>>>>>> 5ea6ac4e3aac7da6e0b8ba8ff1622f1cf5ec3ed9
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
    PasswordResetComponent,
    AddTeamMembersPopOverComponent,
    JsonUploadPopoverComponent,
    AssessmentScopePopoverComponent,
    MobileNavPopoverComponent,
    LegendPopoverComponent,
    AcronymPopoverComponent,
    QuestionHistoryPopoverComponent,
    RiskPopoverComponent,
    FileDeleteComponent,
    DoResetComponent,
    ReportInfoCardComponent
<<<<<<< HEAD
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ViewsComponent,
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
    PasswordResetComponent,
    AddTeamMembersPopOverComponent,
    JsonUploadPopoverComponent,
    AssessmentScopePopoverComponent,
    MobileNavPopoverComponent,
    LegendPopoverComponent,
    AcronymPopoverComponent,
    QuestionHistoryPopoverComponent,
    RiskPopoverComponent,
    FileDeleteComponent,
    DoResetComponent,
    ReportInfoCardComponent
  ],
  entryComponents: [
    ViewsComponent,
=======

    ],
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [
	ViewsComponent,
    AssessmentslistComponent,
>>>>>>> 5ea6ac4e3aac7da6e0b8ba8ff1622f1cf5ec3ed9
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
    PasswordResetComponent,
    AddTeamMembersPopOverComponent,
<<<<<<< HEAD
    JsonUploadPopoverComponent,
=======
		JsonUploadPopoverComponent,
>>>>>>> 5ea6ac4e3aac7da6e0b8ba8ff1622f1cf5ec3ed9
    AssessmentScopePopoverComponent,
    MobileNavPopoverComponent,
    LegendPopoverComponent,
    AcronymPopoverComponent,
    QuestionHistoryPopoverComponent,
    RiskPopoverComponent,
    FileDeleteComponent,
    DoResetComponent,
    ReportInfoCardComponent
<<<<<<< HEAD
  ]
})
export class ComponentsModule { }
=======
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
        PasswordResetComponent,
        QuestionHistoryPopoverComponent,
        RiskPopoverComponent,
        FileDeleteComponent,
        DoResetComponent,
        ReportInfoCardComponent
    ]
})

export class ComponentsModule {}
>>>>>>> 5ea6ac4e3aac7da6e0b8ba8ff1622f1cf5ec3ed9
