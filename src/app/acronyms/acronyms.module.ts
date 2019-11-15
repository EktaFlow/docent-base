import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AcronymPopoverComponent } from '../../app/acronym-popover/acronym-popover.component';


import { IonicModule } from '@ionic/angular';

import { AcronymsPage } from './acronyms.page';

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
    RouterModule.forChild(routes),
    AcronymPopoverComponent
  ],
  declarations: [AcronymsPage]
})
export class AcronymsPageModule {}
