import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../components/components.module";

import { EditAssessmentPage } from "./edit-assessment.page";

const routes: Routes = [
  {
    path: "",
    component: EditAssessmentPage,
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
  declarations: [EditAssessmentPage],
  exports: [EditAssessmentPage],
})
export class EditAssessmentPageModule {}
