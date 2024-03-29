import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../components/components.module";

import { ResetPasswordPage } from "./reset-password.page";

const routes: Routes = [
  {
    path: "",
    component: ResetPasswordPage,
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
  declarations: [ResetPasswordPage],
  exports: [ResetPasswordPage],
})
export class ResetPasswordPageModule {}
