import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AcronymPopoverComponent } from '../../app/acronym-popover/acronym-popover.component';
import { TopbarComponent } from "../../app/topbar/topbar.component";

import { IonicModule } from '@ionic/angular';

import { AcronymsPage } from './acronyms.page';

console.log(TopbarComponent);

const routes: Routes = [
  {
    path: '',
    component: AcronymsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
		TopbarComponent,
    RouterModule.forChild(routes),
    AcronymPopoverComponent,
  ],
  declarations: [TopbarComponent, AcronymsPage]
})
export class AcronymsPageModule {}
