import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../components/components.module";

import { SettingsPage } from "./settings.page";

const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
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
  declarations: [SettingsPage],
  exports: [SettingsPage],
})
export class SettingsPageModule {}
