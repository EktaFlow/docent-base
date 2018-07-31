import { NgModule } from '@angular/core';
import { ViewsComponent } from './views/views';
import { AssessmentslistComponent } from './assessmentslist/assessmentslist';
import { ThreadsListComponent } from './threads-list/threads-list';
import { HelpmenuComponent } from './helpmenu/helpmenu';
import { ContactsDropdownComponent } from './contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from './faq-dropdown/faq-dropdown';
import { FileUploadPopoverComponent } from './file-upload-popover/file-upload-popover';
import { TopbarComponent } from './topbar/topbar';
@NgModule({
	declarations: [
		ViewsComponent,
    AssessmentslistComponent,
    ThreadsListComponent,
		HelpmenuComponent,
		ContactsDropdownComponent,
		FaqDropdownComponent,
    FileUploadPopoverComponent,
    TopbarComponent
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
    TopbarComponent
    ]
})

export class ComponentsModule {}
