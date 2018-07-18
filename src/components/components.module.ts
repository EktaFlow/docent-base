import { NgModule } from '@angular/core';
import { PopoverComponent } from './popover/popover';
import { AssessmentslistComponent } from './assessmentslist/assessmentslist';
@NgModule({
	declarations: [PopoverComponent,
    AssessmentslistComponent],
	imports: [],
	exports: [PopoverComponent,
    AssessmentslistComponent]
})
export class ComponentsModule {}
