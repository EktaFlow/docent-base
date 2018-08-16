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
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

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
        ImportComponent
    ],
	imports: [
        CommonModule,
        IonicModule.forRoot(ViewsComponent),
        IonicModule.forRoot(AssessmentslistComponent),
        IonicModule.forRoot(ThreadsListComponent),
        IonicModule.forRoot(HelpmenuComponent),
        IonicModule.forRoot(ContactsDropdownComponent),
        IonicModule.forRoot(FaqDropdownComponent),
        IonicModule.forRoot(FileUploadPopoverComponent),
        IonicModule.forRoot(TopbarComponent),
        IonicModule.forRoot(ImportComponent)

    ],
	exports: [
		ViewsComponent,
        AssessmentslistComponent,
        ThreadsListComponent,
		HelpmenuComponent,
		ContactsDropdownComponent,
		FaqDropdownComponent,
        FileUploadPopoverComponent,
        TopbarComponent,
        ImportComponent
    ]
})

export class ComponentsModule {}
