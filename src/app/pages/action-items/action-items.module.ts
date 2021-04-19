import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../components/components.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { ActionItemsPage } from "./action-items.page";

const routes: Routes = [
  {
    path: "",
    component: ActionItemsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ActionItemsPage],
  exports: [ActionItemsPage],
})
export class ActionItemsPageModule {}
