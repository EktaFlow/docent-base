import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

import { ViewsComponent } from "./views/views.component";
import { ThreadsListComponent } from "./threads-list/threads-list.component";
import { HelpmenuComponent } from "./helpmenu/helpmenu.component";
import { ContactsDropdownComponent } from "./contacts-dropdown/contacts-dropdown.component";
import { FaqDropdownComponent } from "./faq-dropdown/faq-dropdown.component";
import { FileUploadPopoverComponent } from "./file-upload-popover/file-upload-popover.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { ImportComponent } from "./import/import.component";
import { SubthreadPopupComponent } from "./subthread-popup/subthread-popup.component";
import { ThreadPopupComponent } from "./thread-popup/thread-popup.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { AddTeamMembersPopOverComponent } from "./add-team-members-pop-over/add-team-members-pop-over.component";
import { JsonUploadPopoverComponent } from "./json-upload-popover/json-upload-popover.component";
import { AssessmentScopePopoverComponent } from "./assessment-scope-popover/assessment-scope-popover.component";
import { MobileNavPopoverComponent } from "./mobile-nav-popover/mobile-nav-popover.component";
import { LegendPopoverComponent } from "./legend-popover/legend-popover.component";
import { AcronymPopoverComponent } from "./acronym-popover/acronym-popover.component";
import { QuestionHistoryPopoverComponent } from "./question-history-popover/question-history-popover.component";
import { RiskPopoverComponent } from "./risk-popover/risk-popover.component";
import { FileDeleteComponent } from "./file-delete/file-delete.component";
import { DoResetComponent } from "./do-reset/do-reset.component";
import { ReportInfoCardComponent } from "./report-info-card/report-info-card.component";

@NgModule({
  declarations: [
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
    ReportInfoCardComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
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
    ReportInfoCardComponent,
  ],
  entryComponents: [
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
    ReportInfoCardComponent,
  ],
})
export class ComponentsModule {}
