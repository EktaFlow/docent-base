import { NgModule } from '@angular/core';
import { PopoverComponent } from './popover/popover';
import { AssessmentslistComponent } from './assessmentslist/assessmentslist';
import { ThreadsListComponent } from './threads-list/threads-list';
@NgModule({
	declarations: [PopoverComponent,
    AssessmentslistComponent,
    ThreadsListComponent,
    ThreadsListComponent],
	imports: [],
	exports: [PopoverComponent,
    AssessmentslistComponent,
    ThreadsListComponent,
    ThreadsListComponent]
})
export class ComponentsModule {}
