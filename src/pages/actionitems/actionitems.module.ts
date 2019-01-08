import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionitemsPage } from './actionitems';
import { ComponentsModule } from '../../components/components.module';
import { NgTableComponent } from 'ng2-table/ng2-table';
import { NgTableFilteringDirective } from 'ng2-table/ng2-table';
import { NgTablePagingDirective } from 'ng2-table/ng2-table';
import { NgTableSortingDirective } from 'ng2-table/ng2-table';
  
  

@NgModule({
  declarations: [
    ActionitemsPage,
    NgTableComponent,      
    NgTableFilteringDirective,
    NgTablePagingDirective,
    NgTableSortingDirective
  ],
  imports: [
    IonicPageModule.forChild(ActionitemsPage),
		ComponentsModule
  ],
  entryComponents: [
    ActionitemsPage
  ],
  exports: [
    ActionitemsPage
  ]
})
export class ActionitemsPageModule {}
