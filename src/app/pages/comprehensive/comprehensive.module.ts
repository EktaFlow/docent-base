import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../components/components.module";

import { ComprehensivePage } from "./comprehensive.page";

const routes: Routes = [
  {
    path: "",
    component: ComprehensivePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ComprehensivePage],
  exports: [ComprehensivePage],
})
export class ComprehensivePageModule {}
