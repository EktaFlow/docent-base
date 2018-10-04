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
import { JsonUploadPopoverComponent } from './json-upload-popover/json-upload-popover';

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
    JsonUploadPopoverComponent
    ],
	imports: [],
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
    JsonUploadPopoverComponent
    ]
})

export class ComponentsModule {}
